import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode} from 'jwt-decode';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface LoginDto {
  userName: string;
  password: string;
}

export interface JwtPayload {
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/Auth/login';
  private readonly tokenKey = 'auth_token';

  private router = inject(Router);

  constructor() { }

  login(userName: string, password: string): Observable<any> {
    const payload: LoginDto = { userName, password };
    return this.http.post<{token : string}>(this.URLbase, payload);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const { exp } = this.getTokenPayload();
    return exp * 1000 > Date.now(); // token aún válido
  }



  getTokenPayload(): JwtPayload {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : {  exp: 0 };
  }
}