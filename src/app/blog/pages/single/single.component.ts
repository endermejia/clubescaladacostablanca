import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {Post} from '../../models/blogger.model';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})

export class SingleComponent implements OnInit {

  public post: Post = {} as Post;

  constructor(
    public activatedRoute: ActivatedRoute,
    public blogService: BlogService
  ) {
  }

  ngOnInit(): void {
    this.getPost();
  }

  private getPost() {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.blogService.getPostData(id))
      )
      .subscribe(post => this.post = post as Post);
  }

}
