import { LOCALE_ID, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

registerLocaleData(localeEs);

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
