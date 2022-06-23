import {Component, OnInit} from '@angular/core';
import {ContactModel} from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contact: ContactModel = {
    title: '📧 Contáctanos',
    firstParagraph: 'Puedes contactar con nosotros enviando un email a la siguiente dirección:',
    emailCECB: 'clubescaladacostablanca@gmail.com',
    secondParagraph: 'O bien, puedes rellenar el siguiente formulario de contacto:',
    formTitle: 'Formulario de contacto',
    formspree: 'https://formspree.io/f/moqrrrer',
    name: 'Nombre',
    email: 'Email',
    phone: 'Teléfono',
    message: 'Mensaje',
    send: 'Enviar'
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
