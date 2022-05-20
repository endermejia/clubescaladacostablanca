import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './pages/about/about.component';
import {ContactComponent} from './pages/contact/contact.component';
import {HomeComponent} from './pages/home/home.component';
import {ListComponent} from './pages/list/list.component';
import {PartnerComponent} from './pages/partner/partner.component';
import {SearchComponent} from './pages/search/search.component';
import {SingleComponent} from './pages/single/single.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'blog',
        component: ListComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'socios',
        component: PartnerComponent
      },
      {
        path: 'contacto',
        component: ContactComponent
      },
      {
        path: 'buscar',
        component: SearchComponent
      },
      {
        path: 'blog/:id',
        component: SingleComponent
      },
      {
        path: '**',
        redirectTo: 'blog'
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule { }
