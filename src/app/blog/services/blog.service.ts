import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostList} from "../models/blogger.model";

const BLOG_ID: string = '6089498837036915886';
const API_KEY: string = 'AIzaSyC9-oJAL0mL46-F-SEqdIMZ5mqz9kRLieQ'

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor( private http: HttpClient) {
  }

  public getPostsData(): Observable<Object> {
    const httpOptions = {
      url: `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`
    }
    return this.http.get(httpOptions.url);
  }

  public getPostData(id: string): Observable<Object> {
    const httpOptions = {
      url: `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`
    }
    return this.http.get(httpOptions.url);
  }

  public dateFormatted(date: string) {
    return new Date(date).toLocaleDateString();
  }

}
