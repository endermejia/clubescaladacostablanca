import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateServerLoader } from './services/translate-server.loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: TranslateLoader,
      useClass: TranslateServerLoader,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
