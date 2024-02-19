import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../blog.service';
import { Post } from '../../../../models/blogger.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnDestroy {
  postId: string = this.activatedRoute.snapshot.params['id'];
  subscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected blogService: BlogService,
  ) {
    window.scrollTo(0, 0);
    if (!this.blogService.posts.some((post: Post) => post.id === this.postId)) {
      this.subscription = this.blogService
        .getPosts()
        .subscribe((posts: Post[]) => {
          this.blogService.posts = posts;
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
