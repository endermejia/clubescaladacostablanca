import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () =>
      import('./modules/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'sobre-nosotros',
    loadChildren: () =>
      import('./modules/sobre-nosotros/sobre-nosotros.module').then(
        (m) => m.SobreNosotrosModule,
      ),
  },
  {
    path: 'contacto',
    loadChildren: () =>
      import('./modules/contacto/contacto.module').then(
        (m) => m.ContactoModule,
      ),
  },
  {
    path: '**',
    redirectTo: '/blog',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
