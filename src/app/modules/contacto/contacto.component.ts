import { Component } from '@angular/core';

interface ContactModel {
  title: string;
  show: boolean;
  email: string;
  phone?: string;
}

interface ContactFormModel {
  title: string;
  show: boolean;
  formspree: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  sendButton: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
})
export class ContactoComponent {
  public readonly contact: ContactModel = {
    title: 'Puedes contactar con nosotros ...',
    show: true,
    email: 'clubescaladacostablanca@gmail.com',
  };

  public readonly contactForm: ContactFormModel = {
    title: '... o enviando un mensaje',
    show: true,
    formspree: 'https://formspree.io/f/mwkydzgp',
    name: 'Nombre',
    namePlaceholder: '',
    email: 'Email',
    emailPlaceholder: '',
    phone: 'Teléfono',
    phonePlaceholder: '',
    message: 'Mensaje',
    messagePlaceholder: '',
    sendButton: 'Enviar mensaje',
  };
}
