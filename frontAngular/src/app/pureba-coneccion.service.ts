import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PurebaConeccionService {

  constructor() { }
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/User';

  public obtenerUsers(){
    return this.http.get<any>(this.URLbase);
  }
}
