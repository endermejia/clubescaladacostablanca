import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {Post} from "../../models/blogger.model";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})

export class SingleComponent implements OnInit {

  public post: Post = {} as Post;

  constructor(public blogService: BlogService) {
  }

  ngOnInit(): void {
    this.getPost();
  }

  private getPost() {
    this.blogService.getPostData(SingleComponent.postId).subscribe(
      (data: Object) => this.post = data as Post);
  }

  private static get postId(): string {
    return window.location.href.split('/').pop() || '';
  }

}
