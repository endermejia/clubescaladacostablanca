import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface PostCardModel {
  title: string;
  img: {
    src: string;
    size?: string;
  };
  id?: string;
  description?: string;
  date?: string;
}

@Component({
  selector: 'app-post-card',
  template: `
@if (postCard) {
  <div class="h-100 d-flex flex-column cursor-pointer" (click)="openPost()">
    <div class="img-zoom position-relative" style="height: 240px">
      <img
        [ngSrc]="postCard.img.src"
        fill
        [alt]="postCard.title"
        class="img-fluid"
        style="object-fit: cover"
      />
      <div class="position-absolute top-0 end-0 m-3">
        <span
          class="badge bg-white text-primary rounded-pill px-3 py-2 shadow-sm font-heading small"
        >
          {{ postCard.date | date: "dd MMM yyyy" }}
        </span>
      </div>
    </div>

    <div class="p-4 d-flex flex-column flex-grow-1">
      <h3 class="h5 font-heading text-primary mb-3">{{ postCard.title }}</h3>
      <p class="text-muted small mb-4 flex-grow-1">
        {{ postCard.description }}
      </p>

      <div
        class="mt-auto d-flex align-items-center text-secondary font-heading small text-uppercase letter-spacing-1"
      >
        {{ "blog.read_more" | translate }}
        <i class="bi bi-chevron-right ms-2 mt-1"></i>
      </div>
    </div>
  </div>
}
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, NgOptimizedImage, TranslateModule],
})
export class PostCardComponent {
  @Input() public postCard: PostCardModel | undefined;

  constructor(private router: Router) {}

  openPost(): void {
    if (this.postCard?.id) {
      this.router.navigate(['post', this.postCard.id]);
    }
  }
}
