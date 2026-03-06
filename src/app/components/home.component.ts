import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogComponent } from './blog.component';
import { SobreNosotrosComponent } from './sobre-nosotros.component';
import { ContactoComponent } from './contacto.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BlogComponent,
    SobreNosotrosComponent,
    ContactoComponent,
    TranslateModule,
  ],
  template: `
<section class="hero-wrapper">
  <div
    class="hero-bg"
    style="
      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
        url(&quot;assets/hero_climber_alt.jpg&quot;);
    "
  ></div>
  <div class="container hero-content">
    <h1 class="display-4 mb-4 font-heading text-white">
      {{ "hero.title" | translate }}
      <span class="text-secondary">{{ "hero.subtitle" | translate }}</span>
    </h1>
    <p class="lead mb-5 px-lg-5 text-white">
      {{ "hero.description" | translate }}
    </p>
    <div class="d-flex gap-3 justify-content-center flex-wrap">
      <a href="#blog" class="btn-outline-white text-decoration-none">{{
        "hero.cta_news" | translate
      }}</a>
      <a
        [href]="hazteSocioUrl"
        target="_blank"
        class="btn-premium text-decoration-none"
        >{{ "hero.cta_join" | translate }}</a
      >
    </div>
  </div>
</section>

<app-blog id="blog" class="page-section"></app-blog>
<app-sobre-nosotros
  id="sobre-nosotros"
  class="page-section bg-alt"
></app-sobre-nosotros>
<app-contacto id="contacto" class="page-section"></app-contacto>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public readonly hazteSocioUrl =
    'https://docs.google.com/forms/d/1LqRGAhFBM2Drh1osE3RsvVhZUTYPzs0-aiwtoTY66zE';

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
