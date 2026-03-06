import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Subscription } from 'rxjs';
import { Post } from '../models/blogger.model';
import { PostCardComponent } from './post-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

const INITIAL_POSTS = 3;

@Component({
  selector: 'app-blog',
  template: `
<section class="container">
  <!-- Section Title -->
  <div class="section-title">
    <h2>{{ "blog.title" | translate }}</h2>
    <p class="lead text-muted">{{ "blog.subtitle" | translate }}</p>
  </div>

  <!-- Initial Posts (always visible) -->
  <div class="row g-4 mt-2">
    @for (post of initialPosts(); track post.id) {
      <div class="col-lg-4 col-md-6 col-12">
        <div class="card-modern h-100">
          <app-post-card
            class="h-100 d-block"
            [postCard]="{
              title: post.title,
              img: { src: post.images[0]?.url || 'assets/logo.webp' },
              date: post?.published,
              description: post.author.displayName,
              id: post.id
            }"
          ></app-post-card>
        </div>
      </div>
    }
  </div>

  <!-- Extra Posts loaded lazily with @defer -->
  @defer (when showExtra()) {
    <div class="row g-4 mt-0 extra-posts-grid">
      @for (post of extraPosts(); track post.id) {
        <div class="col-lg-4 col-md-6 col-12 post-card-animated">
          <div class="card-modern h-100">
            <app-post-card
              class="h-100 d-block"
              [postCard]="{
                title: post.title,
                img: { src: post.images[0]?.url || 'assets/logo.webp' },
                date: post?.published,
                description: post.author.displayName,
                id: post.id
              }"
            ></app-post-card>
          </div>
        </div>
      }
    </div>
  } @loading {
    <div class="d-flex justify-content-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ "blog.load_more" | translate }}</span>
      </div>
    </div>
  } @placeholder {
    <div></div>
  }

  <!-- Ver más / Ver menos button -->
  @if (blogService.posts().length > 3) {
    <div class="d-flex justify-content-center mt-5 mb-5">
      @if (!allLoaded()) {
        <button
          class="btn-outline-premium px-5"
          id="btn-ver-mas"
          (click)="loadMore()"
        >
          <i class="bi bi-chevron-down me-2"></i>{{ "blog.load_more" | translate }}
        </button>
      } @else {
        <button
          class="btn-outline-premium px-5"
          id="btn-ver-menos"
          (click)="visibleCount.set(3); showExtra.set(false)"
        >
          <i class="bi bi-chevron-up me-2"></i>{{ "blog.load_less" | translate }}
        </button>
      }
    </div>
  }

  <!-- Join Us Banner -->
  <article style="margin-top: 80px; margin-bottom: 2rem">
    <div class="card-modern overflow-hidden bg-white">
      <div class="row g-0 align-items-center">
        <div class="col-lg-6 p-5 py-lg-4">
          <h2 class="font-heading text-primary mb-4">
            {{ "blog.join_title" | translate }}
          </h2>
          <p class="lead mb-4">
            {{ "blog.join_desc" | translate }}
          </p>
          <a routerLink="/inscripcion" class="btn-premium">{{
            "blog.join_btn" | translate
          }}</a>
        </div>
        <div class="col-lg-6 position-relative" style="min-height: 400px">
          <img
            src="assets/logo-antiguo.webp"
            class="img-fluid w-100 h-100 object-fit-cover position-absolute top-0 start-0"
            alt="Hazte Socio"
          />
        </div>
      </div>
    </div>
  </article>
</section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostCardComponent, TranslateModule, RouterLink],
})
export class BlogComponent implements OnDestroy {
  subscription?: Subscription;

  public visibleCount = signal(INITIAL_POSTS);
  public showExtra = signal(false);

  public readonly initialPosts = computed<Post[]>(() =>
    this.blogService.posts().slice(0, INITIAL_POSTS),
  );

  public readonly extraPosts = computed<Post[]>(() =>
    this.blogService.posts().slice(INITIAL_POSTS, this.visibleCount()),
  );

  public readonly allLoaded = computed(
    () => this.visibleCount() >= this.blogService.posts().length,
  );

  constructor(protected blogService: BlogService) {
    this.subscription = this.blogService
      .getPosts()
      .subscribe((posts: Post[]) => {
        this.blogService.posts.set(posts);
      });
  }

  public loadMore(): void {
    this.showExtra.set(true);
    this.visibleCount.update((v) => v + INITIAL_POSTS);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
