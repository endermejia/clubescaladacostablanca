import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./components/post.component').then((m) => m.PostComponent),
  },
  {
    path: 'inscripcion',
    loadComponent: () =>
      import('./components/inscripcion.component').then(
        (m) => m.InscripcionComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
