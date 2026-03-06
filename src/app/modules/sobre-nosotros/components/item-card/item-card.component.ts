import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GALLERY_SETTINGS, onBeforeSlide } from '../../../../models/gallery';
import { LightgalleryModule } from 'lightgallery/angular';
import { DatePipe, NgOptimizedImage } from '@angular/common';

export interface ItemCardModel {
  title: string;
  img: string;
  description?: string;
  dateFrom?: string;
  dateTo?: string;
  paragraphs?: string[];
}

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LightgalleryModule, DatePipe, NgOptimizedImage],
})
export class ItemCardComponent {
  @Input() public item: ItemCardModel | undefined;

  public today: string = new Date().toISOString().split('T')[0];
  protected readonly GALLERY_SETTINGS = GALLERY_SETTINGS;
  protected readonly onBeforeSlide = onBeforeSlide;
}
