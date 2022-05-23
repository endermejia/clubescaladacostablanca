import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../blog.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  postsData: any = {};

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.blogService.getPostsData().subscribe(
      (data: any) => { this.postsData = data; });
  }

}
