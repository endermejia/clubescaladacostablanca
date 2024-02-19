import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../blog.service';
import { Post } from '../../../../models/blogger.model';
import { Subscription } from 'rxjs';
import { BLOG_INFO } from '../../blog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnDestroy {
  postId?: string;
  subscriptions: Subscription[] = [
    this.activatedRoute.params.subscribe((params) => {
      this.postId = params['id'];
      window.scrollTo(0, 0);
    }),
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    protected blogService: BlogService,
  ) {
    // window.scrollTo(0, 0);
    if (!this.blogService.posts.some((post: Post) => post.id === this.postId)) {
      this.subscriptions.push(
        this.blogService.getPosts().subscribe((posts: Post[]) => {
          this.blogService.posts = posts;
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  protected readonly BLOG_INFO = BLOG_INFO;
}
