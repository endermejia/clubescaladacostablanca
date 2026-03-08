import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BlogData, Post, BloggerFeedResponse } from '../models/blogger.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  public posts = signal<Post[]>([]);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  public getPosts(): Observable<Post[]> {
    const url = `${environment.bloggerUrl}?alt=json`;
    const obs$ = isPlatformBrowser(this.platformId)
      ? this.http.jsonp<BloggerFeedResponse>(url, 'callback')
      : this.http.get<BloggerFeedResponse>(url);

    return obs$.pipe(
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
                const url =
                  img
                    .match(/src=".*?"/)?.[0]
                    .replace('src="', '')
                    .replace('"', '') ?? '';
                return {
                  url: this.optimizeBloggerImageUrl(url, 640),
                };
              }) ?? [],
          } as Post;
        });
      }),
    );
  }

  private optimizeBloggerImageUrl(url: string, width: number): string {
    if (
      !url ||
      (!url.includes('blogger.googleusercontent.com') &&
        !url.includes('bp.blogspot.com'))
    ) {
      return url;
    }
    // Blogger URLs often have /s1600/ or similar. Replace with /w{width}/
    return url
      .replace(/\/s\d+\//, `/w${width}/`)
      .replace(/\/s\d+-/, `/w${width}-`);
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
