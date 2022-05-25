import {NgModule} from '@angular/core';

import {BlogRoutingModule} from './blog-routing.module';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';

import {AboutComponent} from './pages/about/about.component';
import {ContactComponent} from './pages/contact/contact.component';
import {HomeComponent} from './pages/home/home.component';
import {ListComponent} from './pages/list/list.component';
import {PartnerComponent} from './pages/partner/partner.component';
import {SingleComponent} from './pages/single/single.component';


@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ListComponent,
    PartnerComponent,
    SingleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialModule
  ]
})
export class BlogModule {
}
