import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {PostList} from '../../models/blogger.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  postList: PostList = {
    etag: '',
    kind: '',
    items: []
  };

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.blogService.getPostsData().subscribe(
      (data: any) => this.postList = data as PostList);
  }

  dateFormatted(date: string) {
    return new Date(date).toLocaleDateString();
  }

}
