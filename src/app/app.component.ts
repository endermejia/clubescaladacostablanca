import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';
import {
  LanguageService,
  SUPPORTED_LANGUAGES,
} from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule, TranslateModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isScrolled = false;
  public readonly currentYear = new Date().getFullYear();
  public readonly hazteSocioUrl =
    'https://docs.google.com/forms/d/1LqRGAhFBM2Drh1osE3RsvVhZUTYPzs0-aiwtoTY66zE';
  public readonly languages = SUPPORTED_LANGUAGES;

  constructor(public langService: LanguageService) {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 50;
      });
    }
  }

  public readonly contact = {
    items: [
      {
        name: 'Facebook',
        link: 'https://www.facebook.com/groups/929089841231971',
        img: 'facebook',
      },
      {
        name: 'Instagram',
        link: 'https://www.instagram.com/clubescaladacostablanca',
        img: 'instagram',
      },
      {
        name: 'GitHub',
        link: 'https://github.com/endermejia/clubescaladacostablanca',
        img: 'github',
      },
    ],
  };
}
