import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { BlogService } from './blog.service';
import { Subscription } from 'rxjs';
import { Post } from '../../models/blogger.model';
import { PostCardComponent } from './components/item-card/post-card.component';
import { TranslateModule } from '@ngx-translate/core';

export interface HazteSocioModel {
  link: string;
  img: string;
}

const INITIAL_POSTS = 3;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostCardComponent, TranslateModule],
})
export class BlogComponent implements OnDestroy {
  public readonly hazteSocio: HazteSocioModel = {
    link: 'https://docs.google.com/forms/d/1LqRGAhFBM2Drh1osE3RsvVhZUTYPzs0-aiwtoTY66zE',
    img: 'assets/logo-antiguo.webp',
  };

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
