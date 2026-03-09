import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from './image-modal.component';

@Component({
  selector: 'app-item-card',
  template: `
    <div
      class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start h-100 w-100"
    >
      <div class="flex-shrink-0 mb-4 mb-sm-0 me-sm-4">
        <div
          class="rounded-circle overflow-hidden shadow border border-4 border-white position-relative"
          [class.cursor-pointer]="hasImage"
          style="width: 100px; height: 100px"
          (click)="openImage()"
        >
          <img
            [src]="imgSrc"
            width="100"
            height="100"
            [alt]="title"
            style="width: 100px; height: 100px; object-fit: cover; display: block"
          />
          @if (hasImage) {
            <div
              class="zoom-icon position-absolute top-50 start-50 translate-middle opacity-0 transition-all"
            >
              <i class="bi bi-zoom-in text-white fs-4"></i>
            </div>
          }
        </div>
      </div>
      <div class="flex-grow-1">
        <h4 class="h5 font-heading text-primary mb-1">{{ title }}</h4>
        @if (description) {
          <div
            class="h6 font-heading text-secondary mb-3"
            [innerHTML]="description"
          ></div>
        }
        <div class="small">
          @for (paragraph of paragraphs; track paragraph) {
            <p class="mb-2 text-muted" [innerHTML]="paragraph"></p>
          }
        </div>
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  styles: [
    `
      .cursor-pointer {
        cursor: pointer;
      }
      .transition-all {
        transition: all 0.3s ease;
      }
      .rounded-circle:hover .zoom-icon {
        opacity: 1 !important;
      }
      .rounded-circle:hover img {
        filter: brightness(0.8);
      }
    `,
  ],
})
export class ItemCardComponent {
  @Input() public title: string = '';
  @Input() public img: string = '';
  @Input() public description?: string;
  @Input() public paragraphs?: string[];

  private modalService = inject(NgbModal);

  public get imgSrc(): string {
    return this.img || '/assets/logo-header.webp';
  }

  public get hasImage(): boolean {
    return !!this.img && this.img !== '/assets/logo-header.webp';
  }

  public openImage(): void {
    if (!this.hasImage) return;
    const modalRef = this.modalService.open(ImageModalComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'image-zoom-modal',
    });
    modalRef.componentInstance.imgSrc = this.imgSrc;
    modalRef.componentInstance.imgAlt = this.title;
  }
}
