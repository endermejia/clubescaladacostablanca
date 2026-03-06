import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface ContactModel {
  title: string;
  email: string;
  phone?: string;
}

interface ContactFormModel {
  title: string;
  formspree: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule],
})
export class ContactoComponent {
  public readonly contact: ContactModel = {
    title: 'contact.title',
    email: 'clubescaladacostablanca@gmail.com',
  };

  public readonly contactForm: ContactFormModel = {
    title: 'contact.form_title',
    formspree: 'https://formspree.io/f/mwkydzgp',
  };

  constructor() {}
}
