import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ItemCardComponent } from './item-card.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from './image-modal.component';

@Component({
  selector: 'app-sobre-nosotros',
  template: `
    <article class="container">
      <!-- Section Title -->
      <div class="section-title">
        <h2>{{ 'about.title' | translate }}</h2>
        <p class="lead text-muted">
          {{ 'about.subtitle' | translate }}
        </p>
      </div>

      <div class="row align-items-center mb-5 pb-5">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <div
            class="d-block position-relative gallery-item card-modern img-zoom cursor-pointer rounded-4 overflow-hidden"
            (click)="openImage('/assets/image.png', 'about.img_caption')"
            style="height: 400px"
          >
            <img
              class="img-fluid w-100 rounded-4"
              ngSrc="assets/image.png"
              alt="Integrantes del Club Escalada Costa Blanca"
              fill
              style="object-fit: cover; display: block;"
            />
            <div
              class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25 opacity-0 transition-all"
            >
              <i class="bi bi-zoom-in text-white fs-1"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-6 ps-lg-5">
          <h3 class="font-heading text-primary mb-4">
            {{ 'about.eco_title' | translate }}
          </h3>
          <div class="lead">
            <p class="text-justify mb-4">
              {{ 'about.eco_p1' | translate }}
            </p>
            <p class="text-justify mb-4">
              {{ 'about.eco_p2' | translate }}
            </p>
            <p class="text-justify mb-4">
              {{ 'about.eco_p3' | translate }}
            </p>
          </div>
        </div>
      </div>

      <div class="row align-items-center pt-5">
        <div class="col-lg-6 order-lg-2 mb-5 mb-lg-0 text-center">
          <div class="position-relative d-inline-block card-modern p-4">
            <img
              class="img-fluid rounded-4"
              ngSrc="assets/mapa-alicante.webp"
              [alt]="'about.eco_title' | translate"
              width="500"
              height="500"
              style="object-fit: contain"
            />
          </div>
        </div>
        <div class="col-lg-6 order-lg-1 pe-lg-5">
          <h3 class="font-heading text-primary mb-4">
            {{ 'about.board_title' | translate }}
          </h3>
          <div class="row g-4">
            @for (member of boardMembers; track member.name) {
              <div class="col-12">
                @defer (on viewport) {
                  <div class="card-modern bg-white p-3 team-card">
                    <app-item-card
                      [title]="member.name"
                      [description]="member.key | translate"
                      [img]="member.img"
                    >
                    </app-item-card>
                  </div>
                } @placeholder {
                  <div
                    class="card-modern bg-white p-3 team-card"
                    style="min-height: 140px; border: 1px solid rgba(0,0,0,0.05)"
                  ></div>
                }
              </div>
            }
          </div>
        </div>
      </div>

      <div class="mt-5 pt-5">
        <div class="text-center mb-5">
          <h3 class="font-heading text-primary">
            {{ 'about.vocal_title' | translate }}
          </h3>
        </div>
        <div class="row g-4 justify-content-center">
          @for (member of vocalMembers; track member.name) {
            <div class="col-md-6 col-lg-4">
              @defer (on viewport) {
                <div
                  class="card-modern bg-white p-4 h-100 team-card text-center"
                >
                  <app-item-card
                    [title]="member.name"
                    [description]="member.key | translate"
                    [img]="member.img"
                  >
                  </app-item-card>
                </div>
              } @placeholder {
                <div
                  class="card-modern bg-white p-4 h-100 team-card"
                  style="min-height: 300px; border: 1px solid rgba(0,0,0,0.05)"
                ></div>
              }
            </div>
          }
        </div>
      </div>
    </article>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemCardComponent, TranslateModule, NgOptimizedImage],
  styles: [
    `
      .cursor-pointer {
        cursor: pointer;
      }
      .transition-all {
        transition: all 0.3s ease;
      }
      .gallery-item:hover .gallery-overlay {
        opacity: 1 !important;
      }
      .gallery-item:hover img {
        transform: scale(1.05);
      }
      .img-zoom img {
        transition: transform 0.5s ease;
      }
    `,
  ],
})
export class SobreNosotrosComponent {
  private modalService = inject(NgbModal);
  private translate = inject(TranslateService);

  public readonly boardMembers = [
    {
      name: 'Roberto López Santodomingo',
      key: 'about.board_pres_desc',
      img: '/assets/socios/roberto.webp',
    },
    {
      name: 'Miguel Anta',
      key: 'about.board_vp_desc',
      img: '/assets/socios/anta.webp',
    },
    {
      name: 'Yolanda López López',
      key: 'about.board_sec_desc',
      img: '/assets/socios/yolanda.webp',
    },
    {
      name: 'Alexander Tristán González Milovic',
      key: 'about.board_tres_desc',
      img: '/assets/socios/alexander.webp',
    },
  ];

  public readonly vocalMembers = [
    {
      name: 'Roy De Valera Paseca',
      key: 'about.vocal_ma_desc',
      img: '/assets/socios/roy.webp',
    },
    {
      name: 'Jose Martin Anaya Ruiz',
      key: 'about.vocal_mb_desc',
      img: '/assets/logo-header.webp',
    },
    {
      name: 'Miguel Ángel Vilaplana Torregrosa',
      key: 'about.vocal_cfa_desc',
      img: '/assets/socios/vila.webp',
    },
    {
      name: 'Alejandro Perales Martínez Quintanilla',
      key: 'about.vocal_al_desc',
      img: '/assets/socios/perales.webp',
    },
    {
      name: 'Miguel Angel Navarro Hernández',
      key: 'about.vocal_av_desc',
      img: '/assets/socios/damacanis.webp',
    },
    {
      name: 'Francisco José Rubio Díaz, (Patxi)',
      key: 'about.vocal_mv_desc',
      img: '/assets/socios/patxi.webp',
    },
    {
      name: 'Daniel Fernández Castello',
      key: 'about.vocal_bv_desc',
      img: '/assets/socios/dan.webp',
    },
    {
      name: 'Fabián Gómiz López',
      key: 'about.vocal_vb_desc',
      img: '/assets/socios/fabian.webp',
    },
    {
      name: 'Salva Soler Soriano',
      key: 'about.vocal_sa_desc',
      img: '/assets/logo-header.webp',
    },
  ];

  public openImage(src: string, captionKey: string): void {
    const modalRef = this.modalService.open(ImageModalComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'image-zoom-modal',
    });
    modalRef.componentInstance.imgSrc = src;
    modalRef.componentInstance.imgAlt = this.translate.instant(captionKey);
  }
}
