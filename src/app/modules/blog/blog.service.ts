import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BlogData, Post } from '../../models/blogger.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  public posts: Post[] = [];

  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.http
      .get<BlogData>(
        `${environment.bloggerUrl}/posts?key=${environment.bloggerApiKey}`,
      )
      .pipe(
        map((blogData: BlogData) => {
          return blogData.items.map((item) => {
            return {
              ...item,
              // add target="_blank" to all links
              content: item.content.replace(
                /<a href/g,
                '<a target="_blank" href',
              ),
              images:
                item.content.match(/<img.*?src=".*?"/g)?.map((img) => {
                  return {
                    url:
                      img
                        .match(/src=".*?"/)?.[0]
                        .replace('src="', '')
                        .replace('"', '') ?? '',
                  };
                }) ?? [],
            };
          });
        }),
      );
  }
}
