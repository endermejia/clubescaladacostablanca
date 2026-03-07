import {
  ApplicationConfig,
  LOCALE_ID,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import {
  provideTranslateHttpLoader,
  TranslateHttpLoader,
} from '@ngx-translate/http-loader';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateHttpLoader,
      },
      fallbackLang: 'es',
    }),
    provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json',
    }),
  ],
};
