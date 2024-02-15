import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'post/:id',
        component: PostComponent,
      },
      {
        path: '',
        component: BlogComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
