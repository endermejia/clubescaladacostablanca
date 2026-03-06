import { provideZonelessChangeDetection } from '@angular/core';
/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    applicationProviders: [provideZonelessChangeDetection()],
  })
  .catch((err) => console.error(err));
