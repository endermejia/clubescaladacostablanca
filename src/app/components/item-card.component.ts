import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  template: `
<div
  class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start h-100 w-100"
>
  <div class="flex-shrink-0 mb-4 mb-sm-0 me-sm-4">
    <div
      class="rounded-circle overflow-hidden shadow border border-4 border-white"
      style="width: 100px; height: 100px"
    >
      <img
        [src]="img"
        width="100"
        height="100"
        [alt]="title"
        style="width: 100px; height: 100px; object-fit: cover; display: block"
      />
    </div>
  </div>
  <div class="flex-grow-1">
    <h3 class="h5 font-heading text-primary mb-1">{{ title }}</h3>
    @if (description) {
      <h5
        class="small font-heading text-secondary mb-3"
        [innerHTML]="description"
      ></h5>
    }
    <div class="small">
      @for (paragraph of paragraphs; track paragraph) {
        <p class="text-justify mb-2 text-muted" [innerHTML]="paragraph"></p>
      }
    </div>
  </div>
</div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ItemCardComponent {
  @Input() public title: string = '';
  @Input() public img: string = '';
  @Input() public description?: string;
  @Input() public dateFrom?: string;
  @Input() public dateTo?: string;
  @Input() public paragraphs?: string[];

  public today: string = new Date().toISOString().split('T')[0];
}
