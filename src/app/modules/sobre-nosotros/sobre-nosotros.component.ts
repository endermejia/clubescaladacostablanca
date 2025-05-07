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
          description: 'Presidente y vocal del Alacantí',
          img: './../assets/socios/roberto.webp',
        },
        {
          title: 'Miguel Anta',
          description: 'Vicepresidente y contacto con la <a href="https://femecv.com/" target="_blank" aria-label="Federación de Deportes de Montaña y Escalada de la Comunidad Valenciana">FEMECV</a>',
          img: './../assets/socios/anta.webp',
        },
        {
          title: 'Yolanda López López',
          description: 'Secretaria',
          img: './../assets/socios/yolanda.webp',
        },
        {
          title: 'Alexander Tristán González Milovic',
          description: 'Tesorero',
          img: './../assets/socios/alexander.webp',
        },
      ],
    },
    vowels: {
      title: 'Vocales',
      members: [
        {
          title: 'Roy De Valera Paseca',
          description: 'Vocal de la Marina Alta',
          img: './../assets/socios/roy.webp',
        },
        {
          title: 'Jose Martin Anaya Ruiz',
          description: 'Vocal de la Marina Baixa',
          img: './../assets/logo-header.webp',
        },
        {
          title: 'Miguel Ángel Vilaplana Torregrosa',
          description: 'Vocal del Comtat y Foia de Alcoy',
          img: './../assets/socios/vila.webp',
        },
        {
          title: 'Alejandro Perales Martínez Quintanilla',
          description: 'Vocal de L´Alcoià',
          img: './../assets/socios/perales.webp',
        },
        {
          title: 'Miguel Angel Navarro Hernández',
          description: 'Vocal del Alto Vinalopó',
          img: './../assets/socios/damacanis.webp',
        },
        {
          title: 'Francisco José Rubio Díaz, (Patxi)',
          description: 'Vocal del Medio Vinalopó',
          img: './../assets/socios/patxi.webp',
        },
        {
          title: 'Daniel Fernández Castello',
          description: 'Vocal del Bajo Vinalopó',
          img: './../assets/socios/dan.webp',
        },
        {
          title: 'Fabián Gómiz López',
          description: 'Vocal de la Vega Baja',
          img: './../assets/socios/fabian.webp',
        },
        {
          title: 'Salva Soler Soriano',
          description: 'Vocal de la Safor',
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
