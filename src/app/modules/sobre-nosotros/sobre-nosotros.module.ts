import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { SobreNosotrosRoutingModule } from './sobre-nosotros-routing.module';
import { SobreNosotrosComponent } from './sobre-nosotros.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { LightgalleryModule } from 'lightgallery/angular';

@NgModule({
  imports: [
    CommonModule,
    SobreNosotrosRoutingModule,
    NgOptimizedImage,
    LightgalleryModule,
    SobreNosotrosComponent,
    ItemCardComponent,
  ],
  exports: [SobreNosotrosComponent],
})
export class SobreNosotrosModule {}
