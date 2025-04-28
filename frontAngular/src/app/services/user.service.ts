import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/User';

  constructor() {}

  // Obtener todos los usuarios
  public getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.URLbase}`);
  }

  // Obtener un usuario por ID
  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URLbase}/${id}`);
  }

  // Crear un nuevo usuario
  public createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.URLbase}`, user);
  }

  // Actualizar un usuario
  public updateUser(user: any): Observable<any> {
    console.log('Actualizando usuario:', user);
    return this.http.put<any>(`${this.URLbase}/update`, user);
    
  }

  // Eliminar un usuario
  public deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URLbase}/${id}`);
  }

  //aca debe ir la peticion para eliminar logico
}
