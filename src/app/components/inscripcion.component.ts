import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

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

export const CUOTA_SOCIO_BASE = 15.00;
export const SUPLEMENTO_TARJETA_FISICA = 2.00;

export const TARIFAS_LICENCIAS_2026: ModalidadLicencia[] = [
  {
    id: 'autonomica',
    nombre: 'INSCRIPCION.LICENCIAS.AUTONOMICA.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.AUTONOMICA.DESC',
    categorias: [
      {
        categoria: 'Adulto',
        opciones: [
          { id: 'aut_adu_base', nombre: 'INSCRIPCION.LICENCIAS.ADULTO_BASE', precio: 51.89 },
          { id: 'aut_adu_esc', nombre: 'INSCRIPCION.LICENCIAS.ADULTO_ESC', precio: 63.89 }
        ]
      },
      {
        categoria: 'Juvenil',
        opciones: [
          { id: 'aut_juv_base', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_BASE', precio: 38.57 },
          { id: 'aut_juv_esc', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_ESC', precio: 48.57 }
        ]
      }
    ]
  },
  {
    id: 'mod_a',
    nombre: 'INSCRIPCION.LICENCIAS.MOD_A.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.MOD_A.DESC',
    categorias: [
      {
        categoria: 'Adulto',
        opciones: [
          { id: 'a_adu_base', nombre: 'INSCRIPCION.LICENCIAS.ADULTO', precio: 62.66 },
          { id: 'a_adu_fedme', nombre: 'INSCRIPCION.LICENCIAS.ADULTO_FEDME', precio: 77.48 }
        ]
      },
      {
        categoria: 'Juvenil',
        opciones: [
          { id: 'a_juv_base', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL', precio: 51.66 },
          { id: 'a_juv_fedme', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FEDME', precio: 59.25 }
        ]
      },
      {
        categoria: 'Infantil',
        opciones: [
          { id: 'a_inf_base', nombre: 'INSCRIPCION.LICENCIAS.INFANTIL', precio: 32.69 },
          { id: 'a_inf_fedme', nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FEDME', precio: 35.25 }
        ]
      }
    ]
  },
  {
    id: 'mod_a_fam',
    nombre: 'INSCRIPCION.LICENCIAS.MOD_A_FAM.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.MOD_A_FAM.DESC',
    categorias: [
      {
        categoria: 'Juvenil',
        opciones: [
          { id: 'afam_juv_base', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FAM', precio: 34.93 },
          { id: 'afam_juv_fedme', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FAM_FEDME', precio: 42.52 }
        ]
      },
      {
        categoria: 'Infantil',
        opciones: [
          { id: 'afam_inf_base', nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FAM', precio: 21.34 },
          { id: 'afam_inf_fedme', nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FAM_FEDME', precio: 23.90 }
        ]
      }
    ]
  },
  {
    id: 'mod_b',
    nombre: 'INSCRIPCION.LICENCIAS.MOD_B.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.MOD_B.DESC',
    categorias: [
      {
        categoria: 'Adulto',
        opciones: [
          { id: 'b_adu_base', nombre: 'INSCRIPCION.LICENCIAS.ADULTO', precio: 96.47 },
          { id: 'b_adu_fedme', nombre: 'INSCRIPCION.LICENCIAS.ADULTO_FEDME', precio: 111.29 }
        ]
      },
      {
        categoria: 'Juvenil',
        opciones: [
          { id: 'b_juv_base', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL', precio: 85.47 },
          { id: 'b_juv_fedme', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FEDME', precio: 93.06 }
        ]
      },
      {
        categoria: 'Infantil',
        opciones: [
          { id: 'b_inf_base', nombre: 'INSCRIPCION.LICENCIAS.INFANTIL', precio: 57.76 },
          { id: 'b_inf_fedme', nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FEDME', precio: 60.32 }
        ]
      }
    ]
  },
  {
    id: 'mod_c',
    nombre: 'INSCRIPCION.LICENCIAS.MOD_C.TITULO',
    descripcion: 'INSCRIPCION.LICENCIAS.MOD_C.DESC',
    categorias: [
      {
        categoria: 'Adulto',
        opciones: [
          { id: 'c_adu_base', nombre: 'INSCRIPCION.LICENCIAS.ADULTO', precio: 141.50 },
          { id: 'c_adu_fedme', nombre: 'INSCRIPCION.LICENCIAS.ADULTO_FEDME', precio: 156.32 }
        ]
      },
      {
        categoria: 'Juvenil',
        opciones: [
          { id: 'c_juv_base', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL', precio: 130.50 },
          { id: 'c_juv_fedme', nombre: 'INSCRIPCION.LICENCIAS.JUVENIL_FEDME', precio: 138.09 }
        ]
      },
      {
        categoria: 'Infantil',
        opciones: [
          { id: 'c_inf_base', nombre: 'INSCRIPCION.LICENCIAS.INFANTIL', precio: 122.30 },
          { id: 'c_inf_fedme', nombre: 'INSCRIPCION.LICENCIAS.INFANTIL_FEDME', precio: 124.86 }
        ]
      }
    ]
  }
];

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
    AsyncPipe,
    CurrencyPipe
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    <div class="container mt-5 pt-5 mb-5">
      <mat-card class="p-4">
        <h2 class="text-center mb-4">{{ 'INSCRIPCION.TITULO' | translate }}</h2>

        <mat-stepper [orientation]="(stepperOrientation$ | async)!" #stepper>
          <!-- PASO 1: DATOS PERSONALES -->
          <mat-step [stepControl]="personalDataForm">
            <form [formGroup]="personalDataForm">
              <ng-template matStepLabel>{{ 'INSCRIPCION.PASO1.TITULO' | translate }}</ng-template>

              <div class="row mt-3">
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.NOMBRE' | translate }}</mat-label>
                    <input matInput formControlName="nombre" required>
                  </mat-form-field>
                </div>
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.APELLIDOS' | translate }}</mat-label>
                    <input matInput formControlName="apellidos" required>
                  </mat-form-field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.GENERO' | translate }}</mat-label>
                    <mat-select formControlName="genero" required>
                      <mat-option value="Mujer">{{ 'INSCRIPCION.MUJER' | translate }}</mat-option>
                      <mat-option value="Hombre">{{ 'INSCRIPCION.HOMBRE' | translate }}</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="col-md-4">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.FECHA_NAC' | translate }}</mat-label>
                    <input matInput [matDatepicker]="picker" formControlName="fechaNacimiento" required>
                    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>
                </div>
                <div class="col-md-4">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.DNI' | translate }}</mat-label>
                    <input matInput formControlName="dni" required>
                  </mat-form-field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-8">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.DOMICILIO' | translate }}</mat-label>
                    <input matInput formControlName="domicilio" required>
                  </mat-form-field>
                </div>
                <div class="col-md-4">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.CP' | translate }}</mat-label>
                    <input matInput formControlName="cp" required>
                  </mat-form-field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.POBLACION' | translate }}</mat-label>
                    <input matInput formControlName="poblacion" required>
                  </mat-form-field>
                </div>
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.PROVINCIA' | translate }}</mat-label>
                    <input matInput formControlName="provincia" required>
                  </mat-form-field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.EMAIL' | translate }}</mat-label>
                    <input matInput type="email" formControlName="email" required>
                  </mat-form-field>
                </div>
                <div class="col-md-6">
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.TELEFONO' | translate }}</mat-label>
                    <input matInput type="tel" formControlName="telefono" required>
                  </mat-form-field>
                </div>
              </div>

              <div class="d-flex justify-content-end mt-3">
                <button mat-flat-button color="primary" matStepperNext>{{ 'INSCRIPCION.SIGUIENTE' | translate }}</button>
              </div>
            </form>
          </mat-step>

          <!-- PASO 2: MODALIDAD Y LICENCIA -->
          <mat-step [stepControl]="licenciaForm">
            <form [formGroup]="licenciaForm">
              <ng-template matStepLabel>{{ 'INSCRIPCION.PASO2.TITULO' | translate }}</ng-template>

              <div class="mt-3 mb-4">
                <label class="d-block mb-2"><strong>{{ 'INSCRIPCION.SITUACION_PREGUNTA' | translate }}</strong></label>
                <mat-radio-group formControlName="situacion" class="d-flex flex-column gap-2">
                  <mat-radio-button value="Nueva">{{ 'INSCRIPCION.SITUACION.NUEVA' | translate }}</mat-radio-button>
                  <mat-radio-button value="Renovación">{{ 'INSCRIPCION.SITUACION.RENOVACION' | translate }}</mat-radio-button>
                  <mat-radio-button value="Otro Club">{{ 'INSCRIPCION.SITUACION.OTRO_CLUB' | translate }}</mat-radio-button>
                  <mat-radio-button value="No deseo federarme">{{ 'INSCRIPCION.SITUACION.NO_FEDERARME' | translate }}</mat-radio-button>
                </mat-radio-group>
              </div>

              <!-- Lógica condicional: Otro Club -->
              @if (licenciaForm.get('situacion')?.value === 'Otro Club') {
                <div class="row mt-3 border p-3 rounded bg-light mb-3">
                  <div class="col-md-6">
                    <mat-form-field appearance="outline" class="w-100">
                      <mat-label>{{ 'INSCRIPCION.NOMBRE_CLUB' | translate }}</mat-label>
                      <input matInput formControlName="nombreClub">
                    </mat-form-field>
                  </div>
                  <div class="col-md-6 d-flex flex-column justify-content-center">
                    <label class="mb-1 small">{{ 'INSCRIPCION.SUBIR_LICENCIA' | translate }}</label>
                    <input type="file" (change)="onFileChange($event, 'imagenLicencia')">
                  </div>
                </div>
              }

              <!-- Lógica condicional: Nueva o Renovación -->
              @if (licenciaForm.get('situacion')?.value === 'Nueva' || licenciaForm.get('situacion')?.value === 'Renovación') {
                <div class="mt-3">
                  <div class="mb-2 text-end">
                    <a href="https://www.femecv.com/sites/default/files/2026-03/Tarifas%20licencias%202026%20-%20web%20castellano%20%281%29.pdf" target="_blank" class="small text-decoration-none">
                      <i class="bi bi-file-pdf"></i> {{ 'INSCRIPCION.VER_TARIFAS' | translate }}
                    </a>
                  </div>
                  <mat-form-field appearance="outline" class="w-100">
                    <mat-label>{{ 'INSCRIPCION.TIPO_LICENCIA' | translate }}</mat-label>
                    <mat-select formControlName="licenciaElegida">
                      @for (modalidad of tarifas; track modalidad.id) {
                        <mat-optgroup [label]="modalidad.nombre | translate" [class]="'mod-' + modalidad.id">
                          @for (cat of modalidad.categorias; track cat.categoria) {
                            <ng-container>
                              <mat-option disabled class="category-divider" [class]="'mod-' + modalidad.id">
                                -- {{ cat.categoria | translate }} --
                              </mat-option>
                              @for (opc of cat.opciones; track opc.id) {
                                <mat-option [value]="opc.id" [class]="'mod-' + modalidad.id">
                                  {{ opc.nombre | translate }} - {{ opc.precio | currency:'EUR' }}
                                </mat-option>
                              }
                            </ng-container>
                          }
                        </mat-optgroup>
                      }
                    </mat-select>
                  </mat-form-field>

                  <div class="mb-4">
                    <label class="d-block mb-2"><strong>{{ 'INSCRIPCION.FORMATO_LICENCIA' | translate }}</strong></label>
                    <mat-radio-group formControlName="formatoLicencia" class="d-flex gap-4">
                      <mat-radio-button value="Digital">{{ 'INSCRIPCION.FORMATO.DIGITAL' | translate }} (0€)</mat-radio-button>
                      <mat-radio-button value="Físico">{{ 'INSCRIPCION.FORMATO.FISICO' | translate }} (+{{ suplementoFisica }}€)</mat-radio-button>
                    </mat-radio-group>
                  </div>
                </div>
              }

              <!-- Lógica condicional: Modalidad A Familiar -->
              @if (isModalidadAFamiliarSelected()) {
                <div class="row mt-3 border p-3 rounded bg-light mb-3">
                   <div class="col-12 d-flex flex-column">
                    <label class="mb-1 small fw-bold text-danger">{{ 'INSCRIPCION.SUBIR_DNI_MENOR' | translate }} *</label>
                    <input type="file" (change)="onFileChange($event, 'dniMenor')">
                  </div>
                </div>
              }

              <div class="d-flex justify-content-between mt-3">
                <button mat-button matStepperPrevious>{{ 'INSCRIPCION.ANTERIOR' | translate }}</button>
                <button mat-flat-button color="primary" matStepperNext>{{ 'INSCRIPCION.SIGUIENTE' | translate }}</button>
              </div>
            </form>
          </mat-step>

          <!-- PASO 3: COMUNICACIONES Y PRIVACIDAD -->
          <mat-step [stepControl]="privacyForm">
            <form [formGroup]="privacyForm">
              <ng-template matStepLabel>{{ 'INSCRIPCION.PASO3.TITULO' | translate }}</ng-template>

              <div class="mt-4 d-flex flex-column gap-3">
                <mat-checkbox formControlName="unirseWhatsapp">
                  {{ 'INSCRIPCION.WHATSAPP_CHECK' | translate }}
                </mat-checkbox>
                <div class="alert alert-info py-2 px-3 small">
                  <mat-icon class="align-middle me-1" style="font-size: 18px; height: 18px; width: 18px;">info</mat-icon>
                  {{ 'INSCRIPCION.WHATSAPP_INFO' | translate }}
                </div>

                <mat-checkbox formControlName="aceptarPrivacidad" required>
                  {{ 'INSCRIPCION.PRIVACIDAD_CHECK' | translate }} *
                </mat-checkbox>
                @if (privacyForm.get('aceptarPrivacidad')?.touched && privacyForm.get('aceptarPrivacidad')?.invalid) {
                  <div class="text-danger small ms-4">
                    {{ 'INSCRIPCION.ERROR_PRIVACIDAD' | translate }}
                  </div>
                }
              </div>

              <div class="d-flex justify-content-between mt-4">
                <button mat-button matStepperPrevious>{{ 'INSCRIPCION.ANTERIOR' | translate }}</button>
                <button mat-flat-button color="primary" matStepperNext>{{ 'INSCRIPCION.SIGUIENTE' | translate }}</button>
              </div>
            </form>
          </mat-step>

          <!-- PASO 4: RESUMEN Y PAGO -->
          <mat-step>
            <ng-template matStepLabel>{{ 'INSCRIPCION.PASO4.TITULO' | translate }}</ng-template>

            <div class="mt-3">
              <h4 class="mb-3">{{ 'INSCRIPCION.RESUMEN_DATOS' | translate }}</h4>
              <div class="row mb-4">
                <div class="col-md-6">
                  <p><strong>{{ 'INSCRIPCION.NOMBRE' | translate }}:</strong> {{ personalDataForm.value.nombre }} {{ personalDataForm.value.apellidos }}</p>
                  <p><strong>{{ 'INSCRIPCION.DNI' | translate }}:</strong> {{ personalDataForm.value.dni }}</p>
                  <p><strong>{{ 'INSCRIPCION.EMAIL' | translate }}:</strong> {{ personalDataForm.value.email }}</p>
                </div>
                <div class="col-md-6">
                  <p><strong>{{ 'INSCRIPCION.SITUACION_RESUMEN' | translate }}:</strong> {{ getSituacionLabel(licenciaForm.value.situacion) | translate }}</p>
                  @if (licenciaForm.value.licenciaElegida) {
                    <p>
                      <strong>{{ 'INSCRIPCION.LICENCIA_ELEGIDA' | translate }}:</strong> {{ getLicenciaName(licenciaForm.value.licenciaElegida) | translate }}
                    </p>
                  }
                </div>
              </div>

              <mat-card class="bg-light p-4 mb-4 border-0">
                <h4 class="mb-3 text-center">{{ 'INSCRIPCION.TOTAL_PAGAR' | translate }}</h4>
                <div class="d-flex justify-content-between border-bottom py-2">
                  <span>{{ 'INSCRIPCION.CUOTA_BASE' | translate }}</span>
                  <span>{{ cuotaSocioBase | currency:'EUR' }}</span>
                </div>
                @if (getLicenciaPrice() > 0) {
                  <div class="d-flex justify-content-between border-bottom py-2">
                    <span>{{ 'INSCRIPCION.PRECIO_LICENCIA' | translate }} ({{ getLicenciaName(licenciaForm.value.licenciaElegida) | translate }})</span>
                    <span>{{ getLicenciaPrice() | currency:'EUR' }}</span>
                  </div>
                }
                @if (licenciaForm.value.formatoLicencia === 'Físico') {
                  <div class="d-flex justify-content-between border-bottom py-2">
                    <span>{{ 'INSCRIPCION.SUPLEMENTO_FISICO' | translate }}</span>
                    <span>{{ suplementoFisica | currency:'EUR' }}</span>
                  </div>
                }
                <div class="d-flex justify-content-between py-3 fw-bold fs-4">
                  <span>{{ 'INSCRIPCION.TOTAL' | translate }}</span>
                  <span class="text-primary">{{ calculateTotal() | currency:'EUR' }}</span>
                </div>
              </mat-card>

              <mat-card class="border-primary border p-4 mb-4 shadow-sm">
                <h5 class="text-primary mb-3"><mat-icon class="align-middle me-2">payments</mat-icon>{{ 'INSCRIPCION.INFO_PAGO_TITULO' | translate }}</h5>
                <p>{{ 'INSCRIPCION.TRANSFERENCIA_INSTRUCCION' | translate }}</p>
                <div class="bg-dark text-white p-3 rounded text-center fs-5 fw-mono mb-3">
                  ES54 3005 0067 1127 0304 4426
                </div>
                <div class="alert alert-warning mb-0">
                  <strong>{{ 'INSCRIPCION.CONCEPTO' | translate }}:</strong> {{ personalDataForm.value.nombre }} {{ personalDataForm.value.apellidos }} Cuota 2026
                </div>
              </mat-card>

              <div class="d-flex justify-content-between mt-4">
                <button mat-button matStepperPrevious>{{ 'INSCRIPCION.ANTERIOR' | translate }}</button>
                <button mat-flat-button color="accent" (click)="finalizar()">{{ 'INSCRIPCION.FINALIZAR' | translate }}</button>
              </div>
            </div>
          </mat-step>
        </mat-stepper>
      </mat-card>
    </div>
  `,
  styles: [`
    .fw-mono { font-family: 'Courier New', Courier, monospace; }
    mat-stepper { background: transparent; }
    .optgroup-subtitle { margin-top: -8px; margin-bottom: 4px; }

    /* Colores por modalidad */
    .mod-autonomica { background-color: #e3f2fd !important; color: #0d47a1 !important; }
    .mod-mod_a { background-color: #f1f8e9 !important; color: #1b5e20 !important; }
    .mod-mod_a_fam { background-color: #fffde7 !important; color: #f57f17 !important; }
    .mod-mod_b { background-color: #fff3e0 !important; color: #e65100 !important; }
    .mod-mod_c { background-color: #f3e5f5 !important; color: #4a148c !important; }

    mat-option.mod-autonomica, mat-option.mod-mod_a, mat-option.mod-mod_a_fam, mat-option.mod-mod_b, mat-option.mod-mod_c, .category-divider {
       border-left: 5px solid transparent !important;
    }

    mat-option.mod-autonomica { border-left-color: #0d47a1 !important; }
    mat-option.mod-mod_a { border-left-color: #1b5e20 !important; }
    mat-option.mod-mod_a_fam { border-left-color: #f57f17 !important; }
    mat-option.mod-mod_b { border-left-color: #e65100 !important; }
    mat-option.mod-mod_c { border-left-color: #4a148c !important; }

    .category-divider.mod-autonomica { border-left-color: #0d47a1 !important; }
    .category-divider.mod-mod_a { border-left-color: #1b5e20 !important; }
    .category-divider.mod-mod_a_fam { border-left-color: #f57f17 !important; }
    .category-divider.mod-mod_b { border-left-color: #e65100 !important; }
    .category-divider.mod-mod_c { border-left-color: #4a148c !important; }

    ::ng-deep .mat-mdc-optgroup-label {
      display: flex;
      align-items: center;
      padding: 10px 16px !important;
      font-weight: bold !important;
    }

    ::ng-deep .mat-mdc-optgroup-label::before {
      content: "";
      width: 5px;
      height: 24px;
      margin-right: 10px;
      display: inline-block;
    }

    ::ng-deep .mod-autonomica .mat-mdc-optgroup-label::before { background-color: #0d47a1; }
    ::ng-deep .mod-mod_a .mat-mdc-optgroup-label::before { background-color: #1b5e20; }
    ::ng-deep .mod-mod_a_fam .mat-mdc-optgroup-label::before { background-color: #f57f17; }
    ::ng-deep .mod-mod_b .mat-mdc-optgroup-label::before { background-color: #e65100; }
    ::ng-deep .mod-mod_c .mat-mdc-optgroup-label::before { background-color: #4a148c; }

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
  `]
})
export class InscripcionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);

  personalDataForm!: FormGroup;
  licenciaForm!: FormGroup;
  privacyForm!: FormGroup;

  stepperOrientation$: Observable<'horizontal' | 'vertical'>;

  tarifas = TARIFAS_LICENCIAS_2026;
  cuotaSocioBase = CUOTA_SOCIO_BASE;
  suplementoFisica = SUPLEMENTO_TARJETA_FISICA;

  constructor() {
    this.stepperOrientation$ = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.initForms();
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
      telefono: ['', Validators.required]
    });

    this.licenciaForm = this.fb.group({
      situacion: ['Nueva', Validators.required],
      nombreClub: [''],
      imagenLicencia: [null],
      licenciaElegida: ['a_adu_base', Validators.required],
      formatoLicencia: ['Digital'],
      dniMenor: [null]
    });

    this.privacyForm = this.fb.group({
      unirseWhatsapp: [false],
      aceptarPrivacidad: [false, Validators.requiredTrue]
    });

    // Validaciones condicionales para Situación
    this.licenciaForm.get('situacion')?.valueChanges.subscribe(value => {
      const nombreClub = this.licenciaForm.get('nombreClub');
      const licenciaElegida = this.licenciaForm.get('licenciaElegida');

      if (value === 'Otro Club') {
        nombreClub?.setValidators([Validators.required]);
        licenciaElegida?.clearValidators();
      } else if (value === 'Nueva' || value === 'Renovación') {
        nombreClub?.clearValidators();
        licenciaElegida?.setValidators([Validators.required]);
      } else {
        nombreClub?.clearValidators();
        licenciaElegida?.clearValidators();
      }
      nombreClub?.updateValueAndValidity();
      licenciaElegida?.updateValueAndValidity();
    });
  }

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.licenciaForm.get(controlName)?.setValue(file);
    }
  }

  isModalidadAFamiliarSelected(): boolean {
    const id = this.licenciaForm.get('licenciaElegida')?.value;
    return !!(id && id.startsWith('afam'));
  }

  getSituacionLabel(value: string): string {
    const mapping: { [key: string]: string } = {
      'Nueva': 'INSCRIPCION.SITUACION.NUEVA',
      'Renovación': 'INSCRIPCION.SITUACION.RENOVACION',
      'Otro Club': 'INSCRIPCION.SITUACION.OTRO_CLUB',
      'No deseo federarme': 'INSCRIPCION.SITUACION.NO_FEDERARME'
    };
    return mapping[value] || value;
  }

  getLicenciaName(id: string): string {
    for (const mod of this.tarifas) {
      for (const cat of mod.categorias) {
        const found = cat.opciones.find(o => o.id === id);
        if (found) return found.nombre;
      }
    }
    return '';
  }

  getLicenciaPrice(): number {
    const id = this.licenciaForm.get('licenciaElegida')?.value;
    if (!id) return 0;
    for (const mod of this.tarifas) {
      for (const cat of mod.categorias) {
        const found = cat.opciones.find(o => o.id === id);
        if (found) return found.precio;
      }
    }
    return 0;
  }

  calculateTotal(): number {
    let total = this.cuotaSocioBase;
    total += this.getLicenciaPrice();
    if (this.licenciaForm.get('formatoLicencia')?.value === 'Físico' &&
       (this.licenciaForm.value.situacion === 'Nueva' || this.licenciaForm.value.situacion === 'Renovación')) {
      total += this.suplementoFisica;
    }
    return total;
  }

  finalizar() {
    if (this.personalDataForm.valid && this.licenciaForm.valid && this.privacyForm.valid) {
      console.log('Formulario Final:', {
        personal: this.personalDataForm.value,
        licencia: this.licenciaForm.value,
        privacidad: this.privacyForm.value,
        total: this.calculateTotal()
      });
      alert('¡Inscripción enviada correctamente! Recuerda realizar la transferencia bancaria.');
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
