import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, firstValueFrom, startWith } from 'rxjs';

import { InscripcionService } from '../services/inscripcion.service';

export interface OpcionLicencia {
  id: string;
  nombre: string;
  precio: number;
}

export interface CategoriaLicencia {
  categoria: 'Adulto' | 'Juvenil' | 'Infantil';
  opciones: OpcionLicencia[];
}

export interface ModalidadLicencia {
  id: string;
  nombre: string;
  descripcion: string;
  categorias: CategoriaLicencia[];
}

export interface LicenciaInfo {
  modalidadNombre: string;
  opcionNombre: string;
  precio: number;
  precioFormatted: string;
}

export const CUOTA_SOCIO_BASE = 15.0;
export const SUPLEMENTO_TARJETA_FISICA = 2.0;
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export const TARIFAS_LICENCIAS_2026: ModalidadLicencia[] = [
  {
    id: 'autonomica',
    nombre: 'INSCRIPCION.LICENCIAS.AUTONOMICA.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.AUTONOMICA.DESC',
    categorias: [
      {
        categoria: 'Adulto',
        opciones: [
          {
            id: 'aut_adu_base',
            nombre: 'INSCRIPCION.LICENCIAS.ADULTO_BASE',
            precio: 51.89,
          },
          {
            id: 'aut_adu_esc',
            nombre: 'INSCRIPCION.LICENCIAS.ADULTO_ESC',
            precio: 63.89,
          },
        ],
      },
      {
        categoria: 'Juvenil',
        opciones: [
          {
            id: 'aut_juv_base',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_BASE',
            precio: 38.57,
          },
          {
            id: 'aut_juv_esc',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_ESC',
            precio: 48.57,
          },
        ],
      },
    ],
  },
  {
    id: 'mod_a',
    nombre: 'INSCRIPCION.LICENCIAS.MOD_A.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.MOD_A.DESC',
    categorias: [
      {
        categoria: 'Adulto',
        opciones: [
          {
            id: 'a_adu_base',
            nombre: 'INSCRIPCION.LICENCIAS.ADULTO',
            precio: 62.66,
          },
          {
            id: 'a_adu_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.ADULTO_FEDME',
            precio: 77.48,
          },
        ],
      },
      {
        categoria: 'Juvenil',
        opciones: [
          {
            id: 'a_juv_base',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL',
            precio: 51.66,
          },
          {
            id: 'a_juv_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FEDME',
            precio: 59.25,
          },
        ],
      },
      {
        categoria: 'Infantil',
        opciones: [
          {
            id: 'a_inf_base',
            nombre: 'INSCRIPCION.LICENCIAS.INFANTIL',
            precio: 32.69,
          },
          {
            id: 'a_inf_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FEDME',
            precio: 35.25,
          },
        ],
      },
    ],
  },
  {
    id: 'mod_a_fam',
    nombre: 'INSCRIPCION.LICENCIAS.MOD_A_FAM.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.MOD_A_FAM.DESC',
    categorias: [
      {
        categoria: 'Juvenil',
        opciones: [
          {
            id: 'afam_juv_base',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FAM',
            precio: 34.93,
          },
          {
            id: 'afam_juv_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FAM_FEDME',
            precio: 42.52,
          },
        ],
      },
      {
        categoria: 'Infantil',
        opciones: [
          {
            id: 'afam_inf_base',
            nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FAM',
            precio: 21.34,
          },
          {
            id: 'afam_inf_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FAM_FEDME',
            precio: 23.9,
          },
        ],
      },
    ],
  },
  {
    id: 'mod_b',
    nombre: 'INSCRIPCION.LICENCIAS.MOD_B.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.MOD_B.DESC',
    categorias: [
      {
        categoria: 'Adulto',
        opciones: [
          {
            id: 'b_adu_base',
            nombre: 'INSCRIPCION.LICENCIAS.ADULTO',
            precio: 96.47,
          },
          {
            id: 'b_adu_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.ADULTO_FEDME',
            precio: 111.29,
          },
        ],
      },
      {
        categoria: 'Juvenil',
        opciones: [
          {
            id: 'b_juv_base',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL',
            precio: 85.47,
          },
          {
            id: 'b_juv_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FEDME',
            precio: 93.06,
          },
        ],
      },
      {
        categoria: 'Infantil',
        opciones: [
          {
            id: 'b_inf_base',
            nombre: 'INSCRIPCION.LICENCIAS.INFANTIL',
            precio: 57.76,
          },
          {
            id: 'b_inf_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FEDME',
            precio: 60.32,
          },
        ],
      },
    ],
  },
  {
    id: 'mod_c',
    nombre: 'INSCRIPCION.LICENCIAS.MOD_C.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.MOD_C.DESC',
    categorias: [
      {
        categoria: 'Adulto',
        opciones: [
          {
            id: 'c_adu_base',
            nombre: 'INSCRIPCION.LICENCIAS.ADULTO',
            precio: 141.5,
          },
          {
            id: 'c_adu_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.ADULTO_FEDME',
            precio: 156.32,
          },
        ],
      },
      {
        categoria: 'Juvenil',
        opciones: [
          {
            id: 'c_juv_base',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL',
            precio: 130.5,
          },
          {
            id: 'c_juv_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FEDME',
            precio: 138.09,
          },
        ],
      },
      {
        categoria: 'Infantil',
        opciones: [
          {
            id: 'c_inf_base',
            nombre: 'INSCRIPCION.LICENCIAS.INFANTIL',
            precio: 122.3,
          },
          {
            id: 'c_inf_fedme',
            nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FEDME',
            precio: 124.86,
          },
        ],
      },
    ],
  },
];

export const PROVINCIAS_ESPANA = [
  'Álava',
  'Albacete',
  'Alicante',
  'Almería',
  'Asturias',
  'Ávila',
  'Badajoz',
  'Barcelona',
  'Burgos',
  'Cáceres',
  'Cádiz',
  'Cantabria',
  'Castellón',
  'Ciudad Real',
  'Córdoba',
  'Cuenca',
  'Gerona',
  'Granada',
  'Guadalajara',
  'Guipúzcoa',
  'Huelva',
  'Huesca',
  'Islas Baleares',
  'Jaén',
  'La Coruña',
  'La Rioja',
  'Las Palmas',
  'León',
  'Lérida',
  'Lugo',
  'Madrid',
  'Málaga',
  'Murcia',
  'Navarra',
  'Orense',
  'Palencia',
  'Pontevedra',
  'Salamanca',
  'Santa Cruz de Tenerife',
  'Segovia',
  'Sevilla',
  'Soria',
  'Tarragona',
  'Teruel',
  'Toledo',
  'Valencia',
  'Valladolid',
  'Vizcaya',
  'Zamora',
  'Zaragoza',
  'Ceuta',
  'Melilla',
];

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-inscripcion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatAutocompleteModule,

    AsyncPipe,
    CurrencyPipe,
  ],
  providers: [
    provideMomentDateAdapter(MY_DATE_FORMATS),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],

  template: `
    <div class="container px-2 px-md-3 mt-5 pt-5 mb-5">
      <mat-card class="p-2 p-md-4">
        <h2 class="text-center mb-4">{{ 'INSCRIPCION.TITULO' | translate }}</h2>

        <mat-stepper
          [orientation]="(stepperOrientation$ | async)!"
          #stepper
          (selectionChange)="onStepChange($event)"
        >
          <!-- PASO 1: DATOS PERSONALES -->
          <mat-step
            [stepControl]="personalDataForm"
            [errorMessage]="'INSCRIPCION.ERROR.REQUERIDO' | translate"
          >
            <form [formGroup]="personalDataForm">
              <ng-template matStepLabel>{{
                'INSCRIPCION.PASO1.TITULO' | translate
              }}</ng-template>

              <div class="row mt-3">
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{
                      'INSCRIPCION.NOMBRE' | translate
                    }}</mat-label>
                    <input matInput formControlName="nombre" required />
                    @if (personalDataForm.get('nombre')?.hasError('required')) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{
                      'INSCRIPCION.APELLIDOS' | translate
                    }}</mat-label>
                    <input matInput formControlName="apellidos" required />
                    @if (
                      personalDataForm.get('apellidos')?.hasError('required')
                    ) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{
                      'INSCRIPCION.GENERO' | translate
                    }}</mat-label>
                    <mat-select formControlName="genero" required>
                      <mat-option value="Mujer">{{
                        'INSCRIPCION.MUJER' | translate
                      }}</mat-option>
                      <mat-option value="Hombre">{{
                        'INSCRIPCION.HOMBRE' | translate
                      }}</mat-option>
                    </mat-select>
                    @if (personalDataForm.get('genero')?.hasError('required')) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="col-md-4">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{
                      'INSCRIPCION.FECHA_NAC' | translate
                    }}</mat-label>
                    <input
                      matInput
                      [matDatepicker]="picker"
                      formControlName="fechaNacimiento"
                      required
                    />
                    <mat-datepicker-toggle
                      matIconSuffix
                      [for]="picker"
                    ></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                    @if (
                      personalDataForm
                        .get('fechaNacimiento')
                        ?.hasError('required')
                    ) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="col-md-4">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.DNI' | translate }}</mat-label>
                    <input matInput formControlName="dni" required />
                    @if (personalDataForm.get('dni')?.hasError('required')) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-8">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{
                      'INSCRIPCION.DOMICILIO' | translate
                    }}</mat-label>
                    <input matInput formControlName="domicilio" required />
                    @if (
                      personalDataForm.get('domicilio')?.hasError('required')
                    ) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="col-md-4">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.CP' | translate }}</mat-label>
                    <input matInput formControlName="cp" required />
                    @if (personalDataForm.get('cp')?.hasError('required')) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{
                      'INSCRIPCION.POBLACION' | translate
                    }}</mat-label>
                    <input matInput formControlName="poblacion" required />
                    @if (
                      personalDataForm.get('poblacion')?.hasError('required')
                    ) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{
                      'INSCRIPCION.PROVINCIA' | translate
                    }}</mat-label>
                    <input
                      type="text"
                      matInput
                      formControlName="provincia"
                      [matAutocomplete]="auto"
                      required
                    />
                    <mat-autocomplete #auto="matAutocomplete">
                      @for (
                        option of filteredProvincias$ | async;
                        track option
                      ) {
                        <mat-option [value]="option">{{ option }}</mat-option>
                      }
                    </mat-autocomplete>
                    @if (
                      personalDataForm.get('provincia')?.hasError('required')
                    ) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.EMAIL' | translate }}</mat-label>
                    <input
                      matInput
                      type="email"
                      formControlName="email"
                      required
                    />
                    @if (personalDataForm.get('email')?.hasError('required')) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                    @if (personalDataForm.get('email')?.hasError('email')) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.EMAIL' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{
                      'INSCRIPCION.TELEFONO' | translate
                    }}</mat-label>
                    <input
                      matInput
                      type="tel"
                      formControlName="telefono"
                      required
                    />
                    @if (
                      personalDataForm.get('telefono')?.hasError('required')
                    ) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>
                </div>
              </div>

              <div class="d-flex justify-content-end mt-3">
                <button mat-flat-button color="primary" matStepperNext>
                  {{ 'INSCRIPCION.SIGUIENTE' | translate }}
                </button>
              </div>
            </form>
          </mat-step>

          <!-- PASO 2: MODALIDAD Y LICENCIA -->
          <mat-step
            [stepControl]="licenciaForm"
            [errorMessage]="'INSCRIPCION.ERROR.REQUERIDO' | translate"
          >
            <form [formGroup]="licenciaForm">
              <ng-template matStepLabel>{{
                'INSCRIPCION.PASO2.TITULO' | translate
              }}</ng-template>

              <div class="mt-3 mb-4">
                <label class="d-block mb-2"
                  ><strong>{{
                    'INSCRIPCION.SITUACION_PREGUNTA' | translate
                  }}</strong></label
                >
                <mat-radio-group
                  formControlName="situacion"
                  class="d-flex flex-column gap-2"
                >
                  <mat-radio-button value="Nueva">{{
                    'INSCRIPCION.SITUACION.NUEVA' | translate
                  }}</mat-radio-button>
                  <mat-radio-button value="Renovación">{{
                    'INSCRIPCION.SITUACION.RENOVACION' | translate
                  }}</mat-radio-button>
                  <mat-radio-button value="Otro Club">{{
                    'INSCRIPCION.SITUACION.OTRO_CLUB' | translate
                  }}</mat-radio-button>
                  <mat-radio-button value="No deseo federarme">{{
                    'INSCRIPCION.SITUACION.NO_FEDERARME' | translate
                  }}</mat-radio-button>
                </mat-radio-group>
              </div>

              <!-- Lógica condicional: Otro Club -->
              @if (licenciaForm.get('situacion')?.value === 'Otro Club') {
                <div class="row mt-3 border p-2 p-md-3 rounded bg-light mb-3">
                  <div class="col-md-6">
                    <mat-form-field appearance="outline" class="w-100">
                      <mat-label>{{
                        'INSCRIPCION.NOMBRE_CLUB' | translate
                      }}</mat-label>
                      <input matInput formControlName="nombreClub" />
                      @if (
                        licenciaForm.get('nombreClub')?.hasError('required')
                      ) {
                        <mat-error>{{
                          'INSCRIPCION.ERROR.REQUERIDO' | translate
                        }}</mat-error>
                      }
                    </mat-form-field>
                  </div>
                  <div
                    class="col-md-6 d-flex flex-column justify-content-center"
                  >
                    <label class="mb-1 small">{{
                      'INSCRIPCION.SUBIR_LICENCIA' | translate
                    }}</label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      (change)="onFileChange($event, 'imagenLicencia')"
                    />
                    @if (
                      licenciaForm.get('imagenLicencia')?.hasError('invalidType')
                    ) {
                      <mat-error class="small mt-1">{{
                        'INSCRIPCION.ERROR.TIPO_ARCHIVO' | translate
                      }}</mat-error>
                    }
                  </div>
                </div>
              }

              <!-- Lógica condicional: Nueva o Renovación -->
              @if (
                licenciaForm.get('situacion')?.value === 'Nueva' ||
                licenciaForm.get('situacion')?.value === 'Renovación'
              ) {
                <div class="mt-3">
                  <div class="mb-2 text-end">
                    <a
                      href="https://www.femecv.com/sites/default/files/2026-03/Tarifas%20licencias%202026%20-%20web%20castellano%20%281%29.pdf"
                      target="_blank"
                      rel="noopener"
                      class="small text-decoration-none"
                    >
                      <i class="bi bi-file-pdf"></i>
                      {{ 'INSCRIPCION.VER_TARIFAS' | translate }}
                    </a>
                  </div>
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{
                      'INSCRIPCION.TIPO_LICENCIA' | translate
                    }}</mat-label>
                    <mat-select formControlName="licenciaElegida">
                      <mat-select-trigger>
                        {{
                          getLicenciaName(
                            licenciaForm.get('licenciaElegida')?.value
                          )
                        }}
                      </mat-select-trigger>
                      @for (modalidad of tarifas; track modalidad.id) {
                        <mat-optgroup
                          [label]="
                            (modalidad.nombre | translate) +
                            ' - ' +
                            (modalidad.descripcion | translate)
                          "
                          [class]="'mod-' + modalidad.id"
                        >
                          @for (
                            cat of modalidad.categorias;
                            track cat.categoria
                          ) {
                            <ng-container>
                              @for (opc of cat.opciones; track opc.id) {
                                <mat-option
                                  [value]="opc.id"
                                  [class]="'mod-' + modalidad.id"
                                >
                                  {{ opc.nombre | translate }} -
                                  {{ opc.precio | currency: 'EUR' }}
                                </mat-option>
                              }
                            </ng-container>
                          }
                        </mat-optgroup>
                      }
                    </mat-select>
                    @if (
                      licenciaForm.get('licenciaElegida')?.hasError('required')
                    ) {
                      <mat-error>{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                  </mat-form-field>

                  <div class="alert alert-info py-2 px-3 small mb-3">
                    <i class="bi bi-info-circle me-2"></i>
                    {{ 'INSCRIPCION.INFO_FEDME' | translate }}
                  </div>

                  <div class="mb-4">
                    <label class="d-block mb-2"
                      ><strong>{{
                        'INSCRIPCION.FORMATO_LICENCIA' | translate
                      }}</strong></label
                    >
                    <mat-radio-group
                      formControlName="formatoLicencia"
                      class="d-flex gap-4"
                    >
                      <mat-radio-button value="Digital"
                        >{{
                          'INSCRIPCION.FORMATO.DIGITAL' | translate
                        }}
                        (0€)</mat-radio-button
                      >
                      <mat-radio-button value="Físico"
                        >{{ 'INSCRIPCION.FORMATO.FISICO' | translate }} (+{{
                          suplementoFisica
                        }}€)</mat-radio-button
                      >
                    </mat-radio-group>
                  </div>
                </div>
              }

              <!-- Lógica condicional: Modalidad A Familiar -->
              @if (isModalidadAFamiliarSelected()) {
                <div class="row mt-3 border p-2 p-md-3 rounded bg-light mb-3">
                  <div class="col-12 mb-3">
                    <div
                      class="alert alert-warning py-2 px-3 small border-warning"
                    >
                      <i class="bi bi-exclamation-triangle-fill me-2"></i>
                      {{ 'INSCRIPCION.INFO_MOD_FAMILIAR' | translate }}
                    </div>
                  </div>
                  <div class="col-md-6 d-flex flex-column mb-3">
                    <label class="mb-1 small fw-bold text-danger"
                      >{{ 'INSCRIPCION.SUBIR_DNI_MENOR' | translate }} *</label
                    >
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      (change)="onFileChange($event, 'dniMenor')"
                    />
                    @if (
                      licenciaForm.get('dniMenor')?.touched &&
                      licenciaForm.get('dniMenor')?.hasError('required')
                    ) {
                      <mat-error class="small mt-1">{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                    @if (licenciaForm.get('dniMenor')?.hasError('invalidType')) {
                      <mat-error class="small mt-1">{{
                        'INSCRIPCION.ERROR.TIPO_ARCHIVO' | translate
                      }}</mat-error>
                    }
                  </div>
                  <div class="col-md-6 d-flex flex-column mb-3">
                    <label class="mb-1 small fw-bold text-danger"
                      >{{
                        'INSCRIPCION.SUBIR_ACREDITACION_PADRE' | translate
                      }}
                      *</label
                    >
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      (change)="onFileChange($event, 'acreditacionPadre')"
                    />
                    @if (
                      licenciaForm.get('acreditacionPadre')?.touched &&
                      licenciaForm
                        .get('acreditacionPadre')
                        ?.hasError('required')
                    ) {
                      <mat-error class="small mt-1">{{
                        'INSCRIPCION.ERROR.REQUERIDO' | translate
                      }}</mat-error>
                    }
                    @if (
                      licenciaForm.get('acreditacionPadre')?.hasError('invalidType')
                    ) {
                      <mat-error class="small mt-1">{{
                        'INSCRIPCION.ERROR.TIPO_ARCHIVO' | translate
                      }}</mat-error>
                    }
                  </div>
                </div>
              }

              <div class="d-flex justify-content-between mt-3">
                <button mat-button matStepperPrevious>
                  {{ 'INSCRIPCION.ANTERIOR' | translate }}
                </button>
                <button mat-flat-button color="primary" matStepperNext>
                  {{ 'INSCRIPCION.SIGUIENTE' | translate }}
                </button>
              </div>
            </form>
          </mat-step>

          <!-- PASO 3: COMUNICACIONES Y PRIVACIDAD -->
          <mat-step
            [stepControl]="privacyForm"
            [errorMessage]="'INSCRIPCION.ERROR.REQUERIDO' | translate"
          >
            <form [formGroup]="privacyForm">
              <ng-template matStepLabel>{{
                'INSCRIPCION.PASO3.TITULO' | translate
              }}</ng-template>

              <div class="mt-4 d-flex flex-column gap-3">
                <mat-checkbox formControlName="unirseWhatsapp">
                  {{ 'INSCRIPCION.WHATSAPP_CHECK' | translate }}
                </mat-checkbox>
                <div class="alert alert-info py-2 px-3 small">
                  <mat-icon
                    class="align-middle me-1"
                    style="font-size: 18px; height: 18px; width: 18px;"
                    >info</mat-icon
                  >
                  {{ 'INSCRIPCION.WHATSAPP_INFO' | translate }}
                </div>

                <mat-checkbox formControlName="aceptarPrivacidad" required>
                  {{ 'INSCRIPCION.PRIVACIDAD_CHECK' | translate }} *
                </mat-checkbox>
                @if (
                  privacyForm.get('aceptarPrivacidad')?.touched &&
                  privacyForm.get('aceptarPrivacidad')?.invalid
                ) {
                  <mat-error class="ms-4 small d-block mt-1">{{
                    'INSCRIPCION.ERROR.PRIVACIDAD' | translate
                  }}</mat-error>
                }
              </div>

              <div class="d-flex justify-content-between mt-4">
                <button mat-button matStepperPrevious>
                  {{ 'INSCRIPCION.ANTERIOR' | translate }}
                </button>
                <button mat-flat-button color="primary" matStepperNext>
                  {{ 'INSCRIPCION.SIGUIENTE' | translate }}
                </button>
              </div>
            </form>
          </mat-step>

          <!-- PASO 4: RESUMEN Y PAGO -->
          <mat-step>
            <ng-template matStepLabel>{{
              'INSCRIPCION.PASO4.TITULO' | translate
            }}</ng-template>

            <div class="mt-3">
              <h4 class="mb-3">
                {{ 'INSCRIPCION.RESUMEN_DATOS' | translate }}
              </h4>
              <div class="row mb-4">
                <div class="col-md-6">
                  <p>
                    <strong>{{ 'INSCRIPCION.NOMBRE' | translate }}:</strong>
                    {{ personalDataForm.value.nombre }}
                    {{ personalDataForm.value.apellidos }}
                  </p>
                  <p>
                    <strong>{{ 'INSCRIPCION.DNI' | translate }}:</strong>
                    {{ personalDataForm.value.dni }}
                  </p>
                  <p>
                    <strong>{{ 'INSCRIPCION.EMAIL' | translate }}:</strong>
                    {{ personalDataForm.value.email }}
                  </p>
                </div>
                <div class="col-md-6">
                  <p>
                    <strong
                      >{{
                        'INSCRIPCION.SITUACION_RESUMEN' | translate
                      }}:</strong
                    >
                    {{
                      getSituacionLabel(licenciaForm.value.situacion)
                        | translate
                    }}
                  </p>
                  @if (licenciaForm.value.licenciaElegida) {
                    <p>
                      <strong
                        >{{
                          'INSCRIPCION.LICENCIA_ELEGIDA' | translate
                        }}:</strong
                      >
                      {{
                        getLicenciaName(licenciaForm.value.licenciaElegida)
                          | translate
                      }}
                    </p>
                  }
                </div>
              </div>

              <mat-card class="bg-light p-2 p-md-4 mb-4 border-0">
                <h4 class="mb-3 text-center">
                  {{ 'INSCRIPCION.TOTAL_PAGAR' | translate }}
                </h4>
                <div class="d-flex justify-content-between border-bottom py-2">
                  <span>{{ 'INSCRIPCION.CUOTA_BASE' | translate }}</span>
                  <span>{{ cuotaSocioBase | currency: 'EUR' }}</span>
                </div>
                @if (getLicenciaPrice() > 0) {
                  <div
                    class="d-flex justify-content-between border-bottom py-2"
                  >
                    <span
                      >{{ 'INSCRIPCION.PRECIO_LICENCIA' | translate }} ({{
                        getLicenciaName(licenciaForm.value.licenciaElegida)
                          | translate
                      }})</span
                    >
                    <span>{{ getLicenciaPrice() | currency: 'EUR' }}</span>
                  </div>
                }
                @if (licenciaForm.value.formatoLicencia === 'Físico') {
                  <div
                    class="d-flex justify-content-between border-bottom py-2"
                  >
                    <span>{{
                      'INSCRIPCION.SUPLEMENTO_FISICO' | translate
                    }}</span>
                    <span>{{ suplementoFisica | currency: 'EUR' }}</span>
                  </div>
                }
                <div class="d-flex justify-content-between py-3 fw-bold fs-4">
                  <span>{{ 'INSCRIPCION.TOTAL' | translate }}</span>
                  <span class="text-primary">{{
                    calculateTotal() | currency: 'EUR'
                  }}</span>
                </div>
              </mat-card>

              <mat-card class="border-primary border p-2 p-md-4 mb-4 shadow-sm">
                <h5 class="text-primary mb-3">
                  <mat-icon class="align-middle me-2">payments</mat-icon
                  >{{ 'INSCRIPCION.INFO_PAGO_TITULO' | translate }}
                </h5>
                <p>{{ 'INSCRIPCION.TRANSFERENCIA_INSTRUCCION' | translate }}</p>
                <div
                  class="bg-dark text-white p-3 rounded text-center fs-5 fw-mono mb-3 iban-container"
                  (click)="copyAccountToClipboard()"
                  [matTooltip]="'INSCRIPCION.COPIAR_IBAN' | translate"
                  matTooltipPosition="above"
                >
                  ES54 3005 0067 1127 0304 4426
                </div>
                <div class="alert alert-warning mb-0">
                  <strong>{{ 'INSCRIPCION.CONCEPTO' | translate }}:</strong>
                  {{ personalDataForm.value.nombre }}
                  {{ personalDataForm.value.apellidos }} Cuota 2026
                </div>
              </mat-card>

              <div class="d-flex justify-content-between mt-4">
                <button mat-button matStepperPrevious>
                  {{ 'INSCRIPCION.ANTERIOR' | translate }}
                </button>
                <button
                  mat-flat-button
                  color="accent"
                  (click)="finalizar()"
                  [disabled]="isSending || isSent"
                >
                  {{ 'INSCRIPCION.FINALIZAR' | translate }}
                </button>
              </div>
            </div>
          </mat-step>
        </mat-stepper>
      </mat-card>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .mat-step-header.mat-accent .mat-step-icon-invalid {
        background-color: #f44336;
        color: #fff;
      }
      :host ::ng-deep .mat-step-header.mat-accent .mat-step-label-invalid {
        color: #f44336;
      }
      .fw-mono {
        font-family: 'Courier New', Courier, monospace;
      }
      mat-stepper {
        background: transparent;
      }
      .optgroup-subtitle {
        margin-top: -8px;
        margin-bottom: 4px;
      }

      /* Colores por modalidad */
      .mod-autonomica {
        background-color: #e3f2fd !important;
        color: #0d47a1 !important;
      }
      .mod-mod_a {
        background-color: #f1f8e9 !important;
        color: #1b5e20 !important;
      }
      .mod-mod_a_fam {
        background-color: #fffde7 !important;
        color: #f57f17 !important;
      }
      .mod-mod_b {
        background-color: #fff3e0 !important;
        color: #e65100 !important;
      }
      .mod-mod_c {
        background-color: #f3e5f5 !important;
        color: #4a148c !important;
      }

      mat-option.mod-autonomica,
      mat-option.mod-mod_a,
      mat-option.mod-mod_a_fam,
      mat-option.mod-mod_b,
      mat-option.mod-mod_c,
      .category-divider {
        border-left: 5px solid transparent !important;
      }

      mat-option.mod-autonomica {
        border-left-color: #0d47a1 !important;
      }
      mat-option.mod-mod_a {
        border-left-color: #1b5e20 !important;
      }
      mat-option.mod-mod_a_fam {
        border-left-color: #f57f17 !important;
      }
      mat-option.mod-mod_b {
        border-left-color: #e65100 !important;
      }
      mat-option.mod-mod_c {
        border-left-color: #4a148c !important;
      }

      .category-divider.mod-autonomica {
        border-left-color: #0d47a1 !important;
      }
      .category-divider.mod-mod_a {
        border-left-color: #1b5e20 !important;
      }
      .category-divider.mod-mod_a_fam {
        border-left-color: #f57f17 !important;
      }
      .category-divider.mod-mod_b {
        border-left-color: #e65100 !important;
      }
      .category-divider.mod-mod_c {
        border-left-color: #4a148c !important;
      }

      ::ng-deep .mat-mdc-optgroup-label {
        display: flex;
        align-items: center;
        padding: 10px 16px !important;
        font-weight: bold !important;
      }

      ::ng-deep .mat-mdc-optgroup-label::before {
        content: '';
        width: 5px;
        height: 24px;
        margin-right: 10px;
        display: inline-block;
      }

      ::ng-deep .mod-autonomica .mat-mdc-optgroup-label::before {
        background-color: #0d47a1;
      }
      ::ng-deep .mod-mod_a .mat-mdc-optgroup-label::before {
        background-color: #1b5e20;
      }
      ::ng-deep .mod-mod_a_fam .mat-mdc-optgroup-label::before {
        background-color: #f57f17;
      }
      ::ng-deep .mod-mod_b .mat-mdc-optgroup-label::before {
        background-color: #e65100;
      }
      ::ng-deep .mod-mod_c .mat-mdc-optgroup-label::before {
        background-color: #4a148c;
      }

      .category-divider {
        height: 32px !important;
        line-height: 32px !important;
        font-size: 0.8em !important;
        font-weight: bold !important;
        color: #777 !important;
        background-color: #f9f9f9 !important;
        text-align: center;
        opacity: 1 !important;
        pointer-events: none;
        border-bottom: 1px solid #eee;
      }

      mat-form-field {
        margin-bottom: 16px;
      }
      .iban-container {
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .iban-container:hover {
        background-color: #333 !important;
      }
    `,
  ],
})
export class InscripcionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);
  private translate = inject(TranslateService);
  private snackBar = inject(MatSnackBar);
  private inscripcionService = inject(InscripcionService);

  personalDataForm!: FormGroup;
  licenciaForm!: FormGroup;
  privacyForm!: FormGroup;

  stepperOrientation$: Observable<'horizontal' | 'vertical'>;
  isSending = false;
  isSent = false;

  tarifas = TARIFAS_LICENCIAS_2026;
  provincias = PROVINCIAS_ESPANA;
  cuotaSocioBase = CUOTA_SOCIO_BASE;
  suplementoFisica = SUPLEMENTO_TARJETA_FISICA;

  licenciaInfoMap = new Map<string, LicenciaInfo>();

  filteredProvincias$!: Observable<string[]>;

  constructor() {
    this.stepperOrientation$ = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.initForms();
    this.initLicenciaInfoMap();
  }

  private initLicenciaInfoMap() {
    for (const mod of this.tarifas) {
      for (const cat of mod.categorias) {
        for (const opc of cat.opciones) {
          this.licenciaInfoMap.set(opc.id, {
            modalidadNombre: mod.nombre,
            opcionNombre: opc.nombre,
            precio: opc.precio,
            precioFormatted: opc.precio.toLocaleString('de-DE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
          });
        }
      }
    }
  }

  onStepChange(event: StepperSelectionEvent) {
    const prevIndex = event.previouslySelectedIndex;
    let formToValidate: FormGroup | null = null;

    if (prevIndex === 0) formToValidate = this.personalDataForm;
    else if (prevIndex === 1) formToValidate = this.licenciaForm;
    else if (prevIndex === 2) formToValidate = this.privacyForm;

    if (formToValidate) {
      this.markFormGroupTouched(formToValidate);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      control.markAsDirty();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  initForms() {
    this.personalDataForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: [null, Validators.required],
      dni: ['', Validators.required],
      domicilio: ['', Validators.required],
      cp: ['', Validators.required],
      poblacion: ['', Validators.required],
      provincia: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });

    this.filteredProvincias$ = this.personalDataForm
      .get('provincia')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProvincias(value || '')),
      );

    this.licenciaForm = this.fb.group({
      situacion: ['Nueva', Validators.required],
      nombreClub: [''],
      imagenLicencia: [null],
      licenciaElegida: ['a_adu_base', Validators.required],
      formatoLicencia: ['Digital'],
      dniMenor: [null],
      acreditacionPadre: [null],
    });

    this.privacyForm = this.fb.group({
      unirseWhatsapp: [false],
      aceptarPrivacidad: [false, Validators.requiredTrue],
    });

    // Validaciones condicionales para Situación
    this.licenciaForm.get('situacion')?.valueChanges.subscribe((value) => {
      const nombreClub = this.licenciaForm.get('nombreClub');
      const licenciaElegida = this.licenciaForm.get('licenciaElegida');

      if (value === 'Otro Club') {
        nombreClub?.setValidators([Validators.required]);
        licenciaElegida?.clearValidators();
        licenciaElegida?.setValue('');
      } else if (value === 'Nueva' || value === 'Renovación') {
        nombreClub?.clearValidators();
        licenciaElegida?.setValidators([Validators.required]);
        if (!licenciaElegida?.value) {
          licenciaElegida?.setValue('a_adu_base');
        }
      } else {
        nombreClub?.clearValidators();
        licenciaElegida?.clearValidators();
        licenciaElegida?.setValue('');
      }
      nombreClub?.updateValueAndValidity();
      licenciaElegida?.updateValueAndValidity();
    });

    // Validaciones condicionales para Modalidad Familiar
    this.licenciaForm.get('licenciaElegida')?.valueChanges.subscribe(() => {
      const dniMenor = this.licenciaForm.get('dniMenor');
      const acreditacionPadre = this.licenciaForm.get('acreditacionPadre');

      if (this.isModalidadAFamiliarSelected()) {
        dniMenor?.setValidators([Validators.required]);
        acreditacionPadre?.setValidators([Validators.required]);
      } else {
        dniMenor?.clearValidators();
        acreditacionPadre?.clearValidators();
      }
      dniMenor?.updateValueAndValidity();
      acreditacionPadre?.updateValueAndValidity();
    });
  }

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const control = this.licenciaForm.get(controlName);
      if (ALLOWED_FILE_TYPES.includes(file.type)) {
        control?.setValue(file);
        control?.setErrors(null);
      } else {
        control?.setValue(null);
        control?.setErrors({ invalidType: true });
        event.target.value = '';
      }
    }
  }

  private async fileToBase64(
    file: File,
  ): Promise<{ data: string; name: string; mimeType: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve({
          data: base64String,
          name: file.name,
          mimeType: file.type,
        });
      };
      reader.onerror = (error) => reject(error);
    });
  }

  private _filterProvincias(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.provincias.filter((option) =>
      option.toLowerCase().includes(filterValue),
    );
  }

  isModalidadAFamiliarSelected(): boolean {
    const id = this.licenciaForm.get('licenciaElegida')?.value;
    return !!(id && id.startsWith('afam'));
  }

  getSituacionLabel(value: string): string {
    const mapping: { [key: string]: string } = {
      Nueva: 'INSCRIPCION.SITUACION.NUEVA',
      Renovación: 'INSCRIPCION.SITUACION.RENOVACION',
      'Otro Club': 'INSCRIPCION.SITUACION.OTRO_CLUB',
      'No deseo federarme': 'INSCRIPCION.SITUACION.NO_FEDERARME',
    };
    return mapping[value] || value;
  }

  copyAccountToClipboard() {
    const iban = 'ES54 3005 0067 1127 0304 4426';
    navigator.clipboard.writeText(iban).then(() => {
      this.snackBar.open(
        this.translate.instant('INSCRIPCION.IBAN_COPIADO'),
        this.translate.instant('INSCRIPCION.CERRAR'),
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        },
      );
    });
  }

  getLicenciaName(id: string): string {
    const data = this.licenciaInfoMap.get(id);
    if (data) {
      const modalidadNombre = this.translate.instant(data.modalidadNombre);
      const opcionNombre = this.translate.instant(data.opcionNombre);
      return `${modalidadNombre} - ${opcionNombre} - ${data.precioFormatted}€`;
    }
    return '';
  }

  getLicenciaPrice(): number {
    const id = this.licenciaForm.get('licenciaElegida')?.value;
    if (!id) return 0;
    return this.licenciaInfoMap.get(id)?.precio || 0;
  }

  calculateTotal(): number {
    let total = this.cuotaSocioBase;
    total += this.getLicenciaPrice();
    if (
      this.licenciaForm.get('formatoLicencia')?.value === 'Físico' &&
      (this.licenciaForm.value.situacion === 'Nueva' ||
        this.licenciaForm.value.situacion === 'Renovación')
    ) {
      total += this.suplementoFisica;
    }
    return total;
  }

  async finalizar() {
    this.markFormGroupTouched(this.personalDataForm);
    this.markFormGroupTouched(this.licenciaForm);
    this.markFormGroupTouched(this.privacyForm);

    if (
      this.personalDataForm.valid &&
      this.licenciaForm.valid &&
      this.privacyForm.valid
    ) {
      this.isSending = true;
      try {
        const archivos: any = {};

        // Procesar archivos adjuntos
        const fileControls = [
          'imagenLicencia',
          'dniMenor',
          'acreditacionPadre',
        ];
        for (const controlName of fileControls) {
          const file = this.licenciaForm.get(controlName)?.value;
          if (file instanceof File) {
            const fileData = await this.fileToBase64(file);
            archivos[controlName] = fileData;
          }
        }

        const personal = { ...this.personalDataForm.value };
        if (personal.fechaNacimiento) {
          const date = new Date(personal.fechaNacimiento);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          personal.fechaNacimiento = `${year}-${month}-${day}`;
        }

        const formData = {
          personal: personal,
          licencia: {
            ...this.licenciaForm.value,
            licenciaElegidaNombre: this.getLicenciaName(
              this.licenciaForm.value.licenciaElegida,
            ),
          },
          privacidad: this.privacyForm.value,
          total: this.calculateTotal().toFixed(2).replace('.', ','),
          archivos: archivos,
        };

        this.snackBar.open(this.translate.instant('INSCRIPCION.ENVIANDO'), '', {
          duration: 0,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        await firstValueFrom(
          this.inscripcionService.enviarInscripcion(formData),
        );

        this.isSent = true;
        this.snackBar.dismiss();

        this.snackBar.open(this.translate.instant('INSCRIPCION.EXITO'), 'OK', {
          duration: 10000,
          panelClass: ['snackbar-success'],
        });
      } catch (error) {
        console.error('Error enviando inscripción:', error);
        this.snackBar.dismiss();
        this.snackBar.open(
          this.translate.instant('INSCRIPCION.ERROR_ENVIO'),
          'OK',
          {
            duration: 10000,
            panelClass: ['snackbar-error'],
          },
        );
      } finally {
        this.isSending = false;
      }
    } else {
      this.snackBar.open(
        this.translate.instant('INSCRIPCION.ERROR_FORMULARIO'),
        'OK',
        {
          duration: 5000,
        },
      );
    }
  }
}
