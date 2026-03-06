import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemCardComponent } from './item-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sobre-nosotros',
  template: `
<article class="container">
  <!-- Section Title -->
  <div class="section-title">
    <h2>{{ "about.title" | translate }}</h2>
    <p class="lead text-muted">
      {{ "about.subtitle" | translate }}
    </p>
  </div>

  <div class="row align-items-center mb-5 pb-5">
    <div class="col-lg-6 mb-4 mb-lg-0">
      <a
        href="/assets/image.png"
        target="_blank"
        [attr.data-sub-html]="'<h4>' + ('about.img_caption' | translate) + '</h4>'"
        class="d-block position-relative gallery-item card-modern img-zoom"
      >
        <img
          class="img-fluid w-100 rounded-4"
          src="/assets/image.png?v=2"
          alt="Club Escalada Costa Blanca"
          style="min-height: 400px; width: 100%; object-fit: cover; display: block;"
        />
        <div
          class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25 opacity-0"
        >
          <i class="bi bi-arrows-fullscreen text-white fs-1"></i>
        </div>
      </a>
    </div>
    <div class="col-lg-6 ps-lg-5">
      <h3 class="font-heading text-primary mb-4">
        {{ "about.eco_title" | translate }}
      </h3>
      <div class="lead">
        <p class="text-justify mb-4">
          {{ "about.eco_p1" | translate }}
        </p>
        <p class="text-justify mb-4">
          {{ "about.eco_p2" | translate }}
        </p>
        <p class="text-justify mb-4">
          {{ "about.eco_p3" | translate }}
        </p>
      </div>
    </div>
  </div>

  <div class="row align-items-center pt-5">
    <div class="col-lg-6 order-lg-2 mb-5 mb-lg-0 text-center">
      <div class="position-relative d-inline-block card-modern p-4">
        <img
          class="img-fluid rounded-4"
          src="/assets/mapa-alicante.webp"
          [alt]="'about.eco_title' | translate"
          width="500"
          height="500"
          style="object-fit: contain"
        />
      </div>
    </div>
    <div class="col-lg-6 order-lg-1 pe-lg-5">
      <h3 class="font-heading text-primary mb-4">
        {{ "about.board_title" | translate }}
      </h3>
      <div class="row g-4">
        <div class="col-12">
          <div class="card-modern bg-white p-3 team-card">
            <app-item-card
              title="Roberto López Santodomingo"
              [description]="'about.board_pres_desc' | translate"
              img="/assets/socios/roberto.webp">
            </app-item-card>
          </div>
        </div>
        <div class="col-12">
          <div class="card-modern bg-white p-3 team-card">
            <app-item-card
              title="Miguel Anta"
              [description]="'about.board_vp_desc' | translate"
              img="/assets/socios/anta.webp">
            </app-item-card>
          </div>
        </div>
        <div class="col-12">
          <div class="card-modern bg-white p-3 team-card">
            <app-item-card
              title="Yolanda López López"
              [description]="'about.board_sec_desc' | translate"
              img="/assets/socios/yolanda.webp">
            </app-item-card>
          </div>
        </div>
        <div class="col-12">
          <div class="card-modern bg-white p-3 team-card">
            <app-item-card
              title="Alexander Tristán González Milovic"
              [description]="'about.board_tres_desc' | translate"
              img="/assets/socios/alexander.webp">
            </app-item-card>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-5 pt-5">
    <div class="text-center mb-5">
      <h3 class="font-heading text-primary">{{ "about.vocal_title" | translate }}</h3>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card-modern bg-white p-4 h-100 team-card text-center">
          <app-item-card
            title="Roy De Valera Paseca"
            [description]="'about.vocal_ma_desc' | translate"
            img="/assets/socios/roy.webp">
          </app-item-card>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card-modern bg-white p-4 h-100 team-card text-center">
          <app-item-card
            title="Jose Martin Anaya Ruiz"
            [description]="'about.vocal_mb_desc' | translate"
            img="/assets/logo-header.webp">
          </app-item-card>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card-modern bg-white p-4 h-100 team-card text-center">
          <app-item-card
            title="Miguel Ángel Vilaplana Torregrosa"
            [description]="'about.vocal_cfa_desc' | translate"
            img="/assets/socios/vila.webp">
          </app-item-card>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card-modern bg-white p-4 h-100 team-card text-center">
          <app-item-card
            title="Alejandro Perales Martínez Quintanilla"
            [description]="'about.vocal_al_desc' | translate"
            img="/assets/socios/perales.webp">
          </app-item-card>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card-modern bg-white p-4 h-100 team-card text-center">
          <app-item-card
            title="Miguel Angel Navarro Hernández"
            [description]="'about.vocal_av_desc' | translate"
            img="/assets/socios/damacanis.webp">
          </app-item-card>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card-modern bg-white p-4 h-100 team-card text-center">
          <app-item-card
            title="Francisco José Rubio Díaz, (Patxi)"
            [description]="'about.vocal_mv_desc' | translate"
            img="/assets/socios/patxi.webp">
          </app-item-card>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card-modern bg-white p-4 h-100 team-card text-center">
          <app-item-card
            title="Daniel Fernández Castello"
            [description]="'about.vocal_bv_desc' | translate"
            img="/assets/socios/dan.webp">
          </app-item-card>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card-modern bg-white p-4 h-100 team-card text-center">
          <app-item-card
            title="Fabián Gómiz López"
            [description]="'about.vocal_vb_desc' | translate"
            img="/assets/socios/fabian.webp">
          </app-item-card>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card-modern bg-white p-4 h-100 team-card text-center">
          <app-item-card
            title="Salva Soler Soriano"
            [description]="'about.vocal_sa_desc' | translate"
            img="/assets/logo-header.webp">
          </app-item-card>
        </div>
      </div>
    </div>
  </div>
</article>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemCardComponent, TranslateModule],
})
export class SobreNosotrosComponent {
  constructor() {}
}
