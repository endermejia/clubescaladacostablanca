import { Component, Input } from '@angular/core';
import { GALLERY_SETTINGS, onBeforeSlide } from '../../../../models/gallery';

export interface ItemCardModel {
  title: string;
  img: {
    src: string;
    size?: string;
  };
  description?: string;
  dateFrom?: string;
  dateTo?: string;
  paragraphs?: string[];
}

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
})
export class ItemCardComponent {
  @Input() public item: ItemCardModel | undefined;

  public today: string = new Date().toISOString().split('T')[0];
  protected readonly GALLERY_SETTINGS = GALLERY_SETTINGS;
  protected readonly onBeforeSlide = onBeforeSlide;
}
