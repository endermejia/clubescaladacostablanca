import { Injectable, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type AppLanguage = 'es' | 'en' | 'ca';

export const SUPPORTED_LANGUAGES: {
  code: AppLanguage;
  label: string;
  flag: string;
}[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: 'ᴇɴ' },
  { code: 'ca', label: 'Valencià', flag: 'ᴠᴀ  ' }, // va con mayusculas pequeñas como las otras de GB y ES
];

const STORAGE_KEY = 'app_lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public currentLang = signal<AppLanguage>('es');

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const saved =
        (localStorage.getItem(STORAGE_KEY) as AppLanguage) ??
        this.detectBrowserLang();
      this.setLang(saved);
    } else {
      this.translate.use('es');
    }
  }

  public setLang(lang: AppLanguage): void {
    this.translate.use(lang);
    this.currentLang.set(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }

  private detectBrowserLang(): AppLanguage {
    if (!isPlatformBrowser(this.platformId)) return 'es';

    const browser = navigator.language?.split('-')[0];
    if (browser === 'ca') return 'ca';
    if (browser === 'en') return 'en';
    return 'es';
  }
}
