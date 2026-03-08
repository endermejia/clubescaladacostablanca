import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogComponent } from './blog.component';
import { SobreNosotrosComponent } from './sobre-nosotros.component';
import { ContactoComponent } from './contacto.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';

import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BlogComponent,
    SobreNosotrosComponent,
    ContactoComponent,
    TranslateModule,
    RouterLink,
    NgOptimizedImage,
  ],
  template: `
    <section class="hero-wrapper">
      <div class="hero-bg-container">
        <img
          ngSrc="assets/hero_climber_alt.jpg"
          alt="Climber on Costa Blanca"
          fill
          priority
          fetchpriority="high"
          class="hero-bg-img"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="container hero-content">
        <h1 class="display-4 mb-4 font-heading text-white">
          {{ 'hero.title' | translate }}
          <span class="text-secondary">{{ 'hero.subtitle' | translate }}</span>
        </h1>
        <p class="lead mb-5 px-lg-5 text-white">
          {{ 'hero.description' | translate }}
        </p>
        <div class="d-flex gap-3 justify-content-center flex-wrap">
          <a href="#blog" class="btn-outline-white text-decoration-none">{{
            'hero.cta_news' | translate
          }}</a>
          <a
            routerLink="/inscripcion"
            class="btn-premium text-decoration-none"
            >{{ 'hero.cta_join' | translate }}</a
          >
        </div>
      </div>
    </section>

    <app-blog id="blog" class="page-section"></app-blog>

    @defer (on viewport) {
      <app-sobre-nosotros
        id="sobre-nosotros"
        class="page-section bg-alt"
      ></app-sobre-nosotros>
    } @placeholder {
      <div
        class="page-section bg-alt"
        style="min-height: 800px; background: rgba(0,0,0,0.02);"
      ></div>
    }

    @defer (on viewport) {
      <app-contacto id="contacto" class="page-section"></app-contacto>
    } @placeholder {
      <div
        class="page-section"
        style="min-height: 600px; background: white;"
      ></div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.translate.get(['hero.title', 'hero.description']).subscribe((res) => {
      const title = `Club Escalada Costa Blanca - ${res['hero.title']}`;
      this.titleService.setTitle(title);
      this.metaService.updateTag({
        name: 'description',
        content: res['hero.description'],
      });
      this.metaService.updateTag({ property: 'og:title', content: title });
      this.metaService.updateTag({
        property: 'og:description',
        content: res['hero.description'],
      });
    });
  }
}
