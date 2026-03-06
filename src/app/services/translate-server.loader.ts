import { Observable, from } from 'rxjs';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import * as fs from 'node:fs';
import { join } from 'node:path';

export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private prefix: string = 'assets/i18n',
    private suffix: string = '.json',
  ) {}

  public getTranslation(lang: string): Observable<TranslationObject> {
    const assetsFolder = join(process.cwd(), 'src', this.prefix);
    const path = join(assetsFolder, `${lang}${this.suffix}`);

    return from(
      new Promise<TranslationObject>((resolve, reject) => {
        try {
          const data = fs.readFileSync(path, 'utf8');
          resolve(JSON.parse(data));
        } catch (e) {
          console.error(`Could not find translation file at ${path}`);
          reject(e);
        }
      }),
    );
  }
}
