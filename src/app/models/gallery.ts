import lgZoom from 'lightgallery/plugins/zoom';
import {BeforeSlideDetail} from "lightgallery/lg-events";

export type GalleryImage = {
  src: string;
  thumbnail: string;
  subHtml: string;
};

export const GALLERY_SETTINGS = {
  counter: false,
  plugins: [lgZoom],
};

export function onBeforeSlide(detail: BeforeSlideDetail): void {
  const { index, prevIndex } = detail;
  console.log(index, prevIndex);
}
