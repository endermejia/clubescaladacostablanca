import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BlogService } from './blog.service';
import { Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { Post } from '../../models/blogger.model';
import { PostCardComponent } from './components/item-card/post-card.component';

export interface HazteSocioModel {
  title: string;
  description: {
    title: string;
    paragraphs: string[];
  };
  button: string;
  link: string;
  img: string;
}

export interface BlogModel {
  title: string;
}

export const BLOG_INFO: BlogModel = {
  title: 'Novedades 📰',
};

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostCardComponent, NgOptimizedImage],
})
export class BlogComponent implements OnDestroy {
  public readonly hazteSocio: HazteSocioModel = {
    title: 'Hazte socio 🧗',
    description: {
      title: 'Por una escalada compatible con el medio.',
      paragraphs: [
        'Si compartes nuestra pasión por la escalada y el respeto por el medio ambiente, te invitamos a unirte a nuestra comunidad.',
        'Juntos, podemos asegurar que las zonas naturales donde lo practicamos se mantengan en perfectas condiciones para las futuras generaciones.',
        'Hazte socio y únete a nosotros en nuestra búsqueda de aventura consciente y respetuosa en la hermosa Costa Blanca.',
      ],
    },
    button: 'Acceder al formulario ❤',
    link: 'https://docs.google.com/forms/d/1LqRGAhFBM2Drh1osE3RsvVhZUTYPzs0-aiwtoTY66zE',
    img: 'assets/logo-antiguo.webp',
  };

  public readonly BLOG_INFO = BLOG_INFO;
  subscription?: Subscription;

  constructor(protected blogService: BlogService) {
    this.subscription = this.blogService
      .getPosts()
      .subscribe((posts: Post[]) => {
        this.blogService.posts.set(posts);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
