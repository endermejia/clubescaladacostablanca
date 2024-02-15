import { Component, OnDestroy } from '@angular/core';
import { BlogService } from './blog.service';
import { Subscription } from 'rxjs';
import { BlogData, Post } from '../../models/blogger.model';

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

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
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
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSelwf4jgn2wltcnovP5bFcULPskxQ1HAqOSMIanTx7iUZAu7A/viewform',
    img: './assets/logo-antiguo.webp',
  };

  public readonly blog: BlogModel = {
    title: 'Novedades 📰',
  };
  subscription?: Subscription;

  constructor(protected blogService: BlogService) {
    window.scrollTo(0, 0);
    this.subscription = this.blogService
      .getPosts()
      .subscribe((posts: Post[]) => {
        this.blogService.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
