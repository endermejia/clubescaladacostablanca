import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgOptimizedImage } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { PostComponent } from './components/post/post.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { PostCardComponent } from './components/item-card/post-card.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    LightgalleryModule,
    NgOptimizedImage,
    BlogComponent,
    PostCardComponent,
    PostComponent,
  ],
  exports: [BlogComponent],
})
export class BlogModule {}
