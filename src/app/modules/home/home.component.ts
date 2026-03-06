import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { SobreNosotrosComponent } from '../sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BlogComponent,
    SobreNosotrosComponent,
    ContactoComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public readonly hazteSocioUrl =
    'https://docs.google.com/forms/d/1LqRGAhFBM2Drh1osE3RsvVhZUTYPzs0-aiwtoTY66zE';
}
