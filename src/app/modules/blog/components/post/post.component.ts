import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../blog.service';
import { Post } from '../../../../models/blogger.model';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
