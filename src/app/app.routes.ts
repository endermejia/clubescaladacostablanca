import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./modules/blog/components/post/post.component').then(
        (m) => m.PostComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
