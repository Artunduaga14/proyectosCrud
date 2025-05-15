import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

interface LoginDto {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/Auth/login';

  constructor() { }

  login(userName: string, password: string): Observable<any> {
    const payload: LoginDto = { userName, password };
    return this.http.post<any>(this.URLbase, payload);
  }
}
