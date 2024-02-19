import { Component, Input } from '@angular/core';
import { GALLERY_SETTINGS, onBeforeSlide } from '../../../../models/gallery';
import { Router } from '@angular/router';

export interface PostCardModel {
  title: string;
  img: {
    src: string;
    size?: string;
  };
  id?: string;
  description?: string;
  date?: string;
}

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  @Input() public postCard: PostCardModel | undefined;

  protected readonly GALLERY_SETTINGS = GALLERY_SETTINGS;
  protected readonly onBeforeSlide = onBeforeSlide;

  constructor(private router: Router) {}

  openPost(): void {
    if (this.postCard?.id) {
      this.router.navigate(['blog', 'post', this.postCard.id]);
    }
  }
}
