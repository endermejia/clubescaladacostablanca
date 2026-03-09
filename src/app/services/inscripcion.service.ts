import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private http = inject(HttpClient);

  enviarInscripcion(data: any): Observable<any> {
    return this.http.post(environment.scriptUrl, JSON.stringify(data));
  }
}
