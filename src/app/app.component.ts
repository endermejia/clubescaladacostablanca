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
  template: `
    <!-- Navigation -->
    <nav
      class="navbar navbar-expand-xl fixed-top"
      [class.scrolled]="isScrolled"
    >
      <div class="container-fluid px-4">
        <a
          class="navbar-brand d-flex align-items-center"
          routerLink="/"
          aria-label="Ir a la página de inicio"
        >
          <img
            ngSrc="assets/logo.webp"
            alt="Club Escalada Costa Blanca Logo"
            width="50"
            height="50"
            priority
            fetchpriority="high"
            class="me-2"
            style="width: auto; height: 50px"
          />
          <span class="font-heading text-secondary h6 h5-md mb-0 ms-1 ms-md-2"
            >Club Escalada
            <span class="text-primary d-block d-md-inline"
              >Costa Blanca</span
            ></span
          >
        </a>

        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <i class="bi bi-list fs-1 text-primary" aria-hidden="true"></i>
        </button>

        <div class="collapse navbar-collapse pb-4 pb-xl-0" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <a class="nav-link" href="#blog" routerLinkActive="active">{{
                'nav.news' | translate
              }}</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#sobre-nosotros"
                routerLinkActive="active"
                >{{ 'nav.about' | translate }}</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contacto" routerLinkActive="active">{{
                'nav.join' | translate
              }}</a>
            </li>

            <!-- Language Switcher -->
            <li class="nav-item ms-xl-2 mt-3 mt-xl-0">
              <div class="lang-switcher d-flex gap-1">
                @for (lang of languages; track lang.code) {
                  <button
                    class="lang-btn"
                    [class.active]="langService.currentLang() === lang.code"
                    (click)="langService.setLang(lang.code)"
                    [title]="lang.label"
                  >
                    {{ lang.flag }}
                  </button>
                }
              </div>
            </li>

            <li class="nav-item ms-xl-3 mt-4 mt-xl-0 mb-2 mb-xl-0">
              <a
                routerLink="/inscripcion"
                class="btn-premium text-decoration-none"
                >{{ 'nav.membership' | translate }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="mt-5">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-lg-4 text-center text-lg-start">
            <img
              ngSrc="assets/logo.webp"
              alt="Club Escalada Costa Blanca Logo"
              height="80"
              class="mb-3"
              width="80"
            />
            <p class="small text-white-50">
              {{ 'footer.tagline' | translate }}
            </p>
          </div>

          <div class="col-lg-4 text-center">
            <h5 class="font-heading mb-4">{{ 'footer.collab' | translate }}</h5>
            <a
              href="https://femecv.com"
              target="_blank"
              rel="noopener"
              class="d-inline-block"
            >
              <img
                src="https://www.femecv.com/themes/custom/femecv/img/femecv-blanco.svg"
                alt="FEMECV"
                height="80"
              />
            </a>
          </div>

          <div class="col-lg-4 text-center text-lg-end">
            <h5 class="font-heading mb-4">{{ 'footer.follow' | translate }}</h5>
            <div
              class="social-icons d-flex justify-content-center justify-content-lg-end"
            >
              @for (item of contact.items; track item) {
                <a
                  href="{{ item.link }}"
                  target="_blank"
                  rel="noopener"
                  [attr.aria-label]="'Seguir en ' + item.name"
                  title="{{ item.name }}"
                >
                  <i class="bi bi-{{ item.img }}" aria-hidden="true"></i>
                </a>
              }
            </div>
          </div>
        </div>

        <hr class="my-5 border-secondary opacity-25" />

        <div class="row footer-links small text-center">
          <div class="col-12">
            <p class="mb-0 text-white-50">
              © {{ currentYear }} Club Escalada Costa Blanca.
              {{ 'footer.rights' | translate }}
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  standalone: true,
  imports: [RouterModule, TranslateModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isScrolled = false;
  public readonly currentYear = new Date().getFullYear();
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
