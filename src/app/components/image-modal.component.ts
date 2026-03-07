import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  template: `
    <div class="modal-header border-0 p-3">
      <h5 class="modal-title invisible">Zoom</h5>
      <button type="button" class="btn-close ms-auto me-0" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body p-0 text-center d-flex align-items-center justify-content-center overflow-hidden">
      <img [src]="imgSrc" [alt]="imgAlt" class="img-fluid" style="max-height: 70vh; width: auto; object-fit: contain;">
    </div>
    @if (imgAlt) {
      <div class="modal-footer border-0 pt-2">
        <p class="text-muted small w-100 text-center mb-0">{{ imgAlt }}</p>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }
    .modal-body img {
      user-select: none;
      max-width: 100%;
    }
  `]
})
export class ImageModalComponent {
  @Input() imgSrc!: string;
  @Input() imgAlt: string = '';

  constructor(public activeModal: NgbActiveModal) {}
}
