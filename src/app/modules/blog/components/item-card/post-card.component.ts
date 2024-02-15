import { Component, Input } from '@angular/core';
import { GALLERY_SETTINGS, onBeforeSlide } from '../../../../models/gallery';

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
  @Input() public item: PostCardModel | undefined;

  public today: string = new Date().toISOString().split('T')[0];
  protected readonly GALLERY_SETTINGS = GALLERY_SETTINGS;
  protected readonly onBeforeSlide = onBeforeSlide;
}
