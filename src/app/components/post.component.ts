import { ChangeDetectionStrategy, Component, OnDestroy, signal, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Post } from '../models/blogger.model';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  template: `
<section class="container py-5 mt-5 pt-5">
  <div class="row g-5">
    <!-- Main Content -->
    <article class="col-lg-8">
      @for (post of blogService.posts(); track post) {
        @if (post.id === postId) {
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/" class="text-secondary">{{
                  "general.home" | translate
                }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/" fragment="blog" class="text-secondary">{{
                  "nav.news" | translate
                }}</a>
              </li>
              <li class="breadcrumb-item active">{{ post.title }}</li>
            </ol>
          </nav>

          <header class="mb-5">
            <h1 class="display-4 font-heading text-primary mb-3">
              {{ post.title }}
            </h1>
            <div
              class="d-flex align-items-center text-muted small font-heading text-uppercase letter-spacing-1"
            >
              <i class="bi bi-calendar3 me-2"></i>
              {{ post.published | date: "dd MMM, yyyy" }}
              <span class="mx-3">|</span>
              <i class="bi bi-person me-2"></i>
              {{ post.author.displayName }}
            </div>
          </header>

          <div
            class="post-content lead text-justify mb-5"
            [innerHTML]="post.content"
          ></div>

          <hr class="my-5 opacity-25" />

          <div class="d-flex justify-content-between">
            <button
              class="btn-outline-premium py-2 px-4 shadow-sm"
              style="color: var(--primary); border-color: var(--primary)"
              [routerLink]="['/post', blogService.getPreviousPostId(postId)]"
              [disabled]="!blogService.getPreviousPostId(postId)"
            >
              <i class="bi bi-chevron-left me-2"></i>
              {{ "blog.prev" | translate }}
            </button>
            <button
              class="btn-outline-premium py-2 px-4 shadow-sm"
              style="color: var(--primary); border-color: var(--primary)"
              [routerLink]="['/post', blogService.getNextPostId(postId)]"
              [disabled]="!blogService.getNextPostId(postId)"
            >
              {{ "blog.next" | translate }}
              <i class="bi bi-chevron-right ms-2"></i>
            </button>
          </div>
        }
      }
    </article>

    <!-- Sidebar -->
    <aside class="col-lg-4">
      <div class="card-modern p-4 bg-white sticky-top" style="top: 100px">
        <h3 class="h5 font-heading text-primary border-bottom pb-3 mb-4">
          {{ "blog.others" | translate }}
        </h3>
        <div class="vstack gap-4">
          @for (post of blogService.posts(); track post) {
            @if (post.id !== postId) {
              <div
                class="d-flex gap-3 align-items-center cursor-pointer"
                [routerLink]="['/post', post.id]"
              >
                <div class="flex-shrink-0" style="width: 80px; height: 60px">
                  <img
                    [src]="post.images[0]?.url || 'assets/logo.webp'"
                    class="w-100 h-100 rounded object-fit-cover shadow-sm"
                    alt="{{ post.title }}"
                  />
                </div>
                <div class="flex-grow-1">
                  <h4 class="h6 mb-1 text-primary fw-bold text-truncate-2">
                    {{ post.title }}
                  </h4>
                  <p class="small text-muted mb-0">
                    {{ post.published | date: "dd MMM" }}
                  </p>
                </div>
              </div>
            }
          }
        </div>
      </div>
    </aside>
  </div>
</section>
  `,
  imports: [RouterLink, DatePipe, TranslateModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnDestroy {
  postId?: string;
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    protected blogService: BlogService,
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.postId = params['id'];

        // Fetch posts if they aren't loaded or if the current post isn't found
        if (
          !this.blogService
            .posts()
            .some((post: Post) => post.id === this.postId)
        ) {
          this.subscriptions.push(
            this.blogService.getPosts().subscribe((posts: Post[]) => {
              this.blogService.posts.set(posts);
            }),
          );
        }
      }),
    );

    effect(() => {
      const post = this.blogService
        .posts()
        .find((p) => p.id === this.postId);
      if (post) {
        const title = `${post.title} | Club Escalada Costa Blanca`;
        this.titleService.setTitle(title);

        const description = post.content
          .replace(/<[^>]*>/g, '')
          .substring(0, 160);
        this.metaService.updateTag({ name: 'description', content: description });
        this.metaService.updateTag({ property: 'og:title', content: title });
        this.metaService.updateTag({
          property: 'og:description',
          content: description,
        });
        if (post.images && post.images.length > 0) {
          this.metaService.updateTag({
            property: 'og:image',
            content: post.images[0].url,
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
