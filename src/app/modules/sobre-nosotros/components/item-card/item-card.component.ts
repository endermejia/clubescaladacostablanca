import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

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
  imports: [NgOptimizedImage],
})
export class ItemCardComponent {
  @Input() public item: ItemCardModel | undefined;

  public today: string = new Date().toISOString().split('T')[0];
}
