import { Component } from '@angular/core';

interface ContactModel {
  title: string;
  email: string;
  phone?: string;
}

interface ContactFormModel {
  title: string;
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
    email: 'clubescaladacostablanca@gmail.com',
  };

  public readonly contactForm: ContactFormModel = {
    title: '... o enviando un mensaje',
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

  constructor() {
    window.scrollTo(0, 0);
  }
}
