import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {PostList} from '../../models/blogger.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  public postList: PostList = {} as PostList;

  constructor(public blogService: BlogService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  private getPosts() {
    this.blogService.getPostsData().subscribe(
      (data: Object) => this.postList = data as PostList);
  }

}
