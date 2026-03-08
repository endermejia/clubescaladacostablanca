import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BlogData, Post, BloggerFeedResponse } from '../models/blogger.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  public posts = signal<Post[]>([]);

  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.http
      .get<BloggerFeedResponse>(`${environment.bloggerUrl}?alt=json`)
      .pipe(
        map((response: BloggerFeedResponse) => {
          return (response.feed.entry || []).map((entry) => {
            const content = entry.content.$t;
            return {
              id: entry.id.$t.split('post-')[1],
              published: entry.published.$t,
              updated: entry.updated.$t,
              title: entry.title.$t,
              content: content.replace(/<a href/g, '<a target="_blank" href'),
              url: entry.link.find((l) => l.rel === 'alternate')?.href ?? '',
              author: {
                displayName: entry.author[0].name.$t,
                image: {
                  url: entry.author[0].gd$image?.src ?? '',
                },
              },
              labels: entry.category?.map((c) => c.term) ?? [],
              images:
                content.match(/<img.*?src=".*?"/g)?.map((img) => {
                  return {
                    url:
                      img
                        .match(/src=".*?"/)?.[0]
                        .replace('src="', '')
                        .replace('"', '') ?? '',
                  };
                }) ?? [],
            } as Post;
          });
        }),
      );
  }

  public getPreviousPostId(postId?: string): string | undefined {
    const posts = this.posts();
    const index = posts.findIndex((post) => post.id === postId);
    return posts[index - 1]?.id;
  }

  public getNextPostId(postId?: string): string | undefined {
    const posts = this.posts();
    const index = posts.findIndex((post) => post.id === postId);
    return posts[index + 1]?.id;
  }
}
