import { Component } from '@angular/core';
import { ItemCardModel } from './components/item-card/item-card.component';
import {
  GALLERY_SETTINGS,
  GalleryImage,
  onBeforeSlide,
} from '../../models/gallery';

export interface AboutModel {
  title: string;
  img: GalleryImage;
  description: {
    title: string;
    img: string;
    paragraphs: string[];
  };
  directive: {
    title: string;
    members: ItemCardModel[];
  };
  vowels: {
    title: string;
    members: ItemCardModel[];
  };
}

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
})
export class SobreNosotrosComponent {
  public readonly about: AboutModel = {
    title: 'Club Escalada Costa Blanca',
    img: {
      src: `./assets/image.png`,
      thumbnail: `./assets/image.png`,
      subHtml: `<h4>Junta Directiva en el Puig Campana</h4>`,
    },
    description: {
      title: 'Por una escalada compatible con el medio.',
      img: './assets/mapa-alicante.webp',
      paragraphs: [
        'Somos una comunidad comprometida con la escalada responsable y el respeto por el medio ambiente.',
        'Nuestra pasión por este deporte va de la mano con el cuidado de las zonas naturales donde lo practicamos. Colaborando con organizaciones locales y autoridades para asegurar un equilibrio entre el disfrute de la escalada y la preservación del entorno.',
        'Únete a nosotros en nuestra búsqueda de aventura consciente y respetuosa en la hermosa Costa Blanca.',
      ],
    },
    directive: {
      title: 'Junta Directiva',
      members: [
        {
          title: 'Roberto López Santodomingo',
          description: 'Presidente',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Miguel Anta',
          description: 'Vicepresidente',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Yolanda López López',
          description: 'Secretaria',
          img: './../assets/socios/yolanda.webp',
        },
        {
          title: 'Alexander Tristán González Milovic',
          description: 'Tesorero',
          img: './../assets/logo-header.webp',
        },
      ],
    },
    vowels: {
      title: 'Vocales',
      members: [
        {
          title: 'Roy De Valera Paseca',
          description: 'Vocal de la Marina Alta',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Jose Martin Anaya Ruiz',
          description: 'Vocal de la Marina Baixa',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Miguel Ángel Vilaplana Torregrosa',
          description: 'Vocal del Comtat y Foia de Alcoy',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Alejandro Perales Martínez Quintanilla',
          description: 'Vocal de L´Alcoià',
          img: './../assets/socios/perales.webp',
        },
        {
          title: 'Miguel Angel Navarro Hernández',
          description: 'Vocal del Alto Vinalopó',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Francisco José Rubio Díaz, (Patxi)',
          description: 'Vocal del Medio Vinalopó',
          img: './../assets/socios/patxi.webp',
        },
        {
          title: 'Daniel Fernández Castello',
          description: 'Vocal del Bajo Vinalopó',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Roberto López Santodomingo',
          description: 'Vocal del Alacantí',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Fabián Gómiz López',
          description: 'Vocal de la Vega Baja',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Salva Soler Soriano',
          description: 'Vocal de la Safor',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Miguel Anta',
          description: 'Contacto con la FEMECV',
          img: './../assets/logo-header.webp',
        },
      ],
    },
  };

  protected readonly GALLERY_SETTINGS = GALLERY_SETTINGS;
  protected readonly onBeforeSlide = onBeforeSlide;

  constructor() {
    window.scrollTo(0, 0);
  }
}
