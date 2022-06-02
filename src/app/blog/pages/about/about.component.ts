import {Component, OnInit} from '@angular/core';
import {Partner} from '../../models/partner.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public partners: Partner[] = [
    {
      name: '',
      firstName: 'Roberto',
      lastName: 'López Santodomingo',
      address: '',
      position: 'Presidente'
    },
    {
      name: '',
      firstName: 'Yolanda',
      lastName: 'López López',
      address: '',
      position: 'Secretaria'
    },
    {
      name: '',
      firstName: 'Alexander Tristán',
      lastName: 'González Milovic',
      address: '',
      position: 'Tesorero'
    },
    {
      name: 'Roy',
      firstName: 'Roy',
      lastName: 'De Valera Paseca',
      address: 'La Marina Alta'
    },
    {
      name: 'Anaya',
      firstName: 'Jose Martin',
      lastName: 'Anaya Ruiz',
      address: 'La Marina Baixa'
    },
    {
      name: 'Vila',
      firstName: 'Miguel Angel',
      lastName: 'Vilaplana Torregrosa',
      address: 'El Comtat y Foia de Alcoy'
    },
    {
      name: 'Perales',
      firstName: 'Alejandro',
      lastName: 'Perales Martínez Quintanilla',
      address: 'L´Alcoià (Foia de Alcoy y Foia de Castalla)'
    },
    {
      name: '',
      firstName: 'Miguel Angel',
      lastName: 'Navarro Hernández',
      address: 'El alto Vinalopó'
    },
    {
      name: 'Patxi',
      firstName: 'Francisco José',
      lastName: 'Rubio Díaz',
      address: 'El medio Vinalapó'
    },
    {
      name: 'Dani',
      firstName: 'Daniel',
      lastName: 'Fernández Castello',
      address: 'El bajo Vinalopó'
    },
    {
      name: '',
      firstName: 'Roberto',
      lastName: 'López Santodomingo',
      address: 'El Alacantí'
    },
    {
      name: '',
      firstName: 'Fabián',
      lastName: 'Gómiz López',
      address: 'El bajo Segura'
    },
    {
      name: '',
      firstName: 'Salva',
      lastName: 'Soler Soriano',
      address: 'La Safor y frontera con Provincia de Valencia'
    },
    {
      name: '',
      firstName: 'Miguel',
      lastName: 'Anta',
      address: 'Contacto con la Federación'
    }

  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
