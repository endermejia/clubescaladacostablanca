import { Component } from '@angular/core';
import { ItemCardModel } from './components/item-card/item-card.component';
import {
  GALLERY_SETTINGS,
  GalleryImage,
  onBeforeSlide,
} from '../../models/gallery';

export interface ProfileModel {
  title: string;
  img: GalleryImage;
  description: {
    title: string;
    img: string;
    paragraphs: string[];
  };
  directive: ItemCardModel[];
  members: ItemCardModel[];
}

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
})
export class SobreNosotrosComponent {
  public readonly profile: ProfileModel = {
    title: 'Club Escalada Costa Blanca',
    img: {
      src: `./assets/image.png`,
      size: '941-828',
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
    directive: [
      {
        title: 'Roberto López Santodomingo',
        description: 'Presidente',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Miguel Anta',
        description: 'Vicepresidente',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Yolanda López López',
        description: 'Secretaria',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Alexander Tristán González Milovic',
        description: 'Tesorero',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
    ],
    members: [
      {
        title: 'Roy De Valera Paseca',
        description: 'Vocal de la Marina Alta',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Jose Martin Anaya Ruiz',
        description: 'Vocal de la Marina Baixa',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Miguel Ángel Vilaplana Torregrosa',
        description: 'Vocal del Comtat y Foia de Alcoy',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Alejandro Perales Martínez Quintanilla',
        description: 'Vocal de L´Alcoià',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Miguel Angel Navarro Hernández',
        description: 'Vocal del Alto Vinalopó',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Francisco José Rubio Díaz, (Patxi)',
        description: 'Vocal del Medio Vinalopó',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Daniel Fernández Castello',
        description: 'Vocal del Bajo Vinalopó',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Roberto López Santodomingo',
        description: 'Vocal del Alacantí',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Fabián Gómiz López',
        description: 'Vocal de la Vega Baja',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Salva Soler Soriano',
        description: 'Vocal de la Safor',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
      {
        title: 'Miguel Anta',
        description: 'Contacto con la FEMECV',
        img: {
          src: './../assets/logo-header.webp',
          size: '941-828',
        },
      },
    ],
  };

  protected readonly GALLERY_SETTINGS = GALLERY_SETTINGS;
  protected readonly onBeforeSlide = onBeforeSlide;
}
