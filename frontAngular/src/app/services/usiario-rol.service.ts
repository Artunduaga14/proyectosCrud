import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRolService {
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/UserRol';

  constructor() {}

  // Obtener todas las relaciones User-Rol
  public getAllUserRoles(): Observable<any> {
    return this.http.get<any>(`${this.URLbase}`);
  }

  // Obtener una relación por ID
  public getUserRolById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URLbase}/${id}`);
  }

  // Crear una nueva relación User-Rol
  public createUserRol(data: any): Observable<any> {
    return this.http.post<any>(`${this.URLbase}`, data);
  }

  // Actualizar una relación existente
  public updateUserRol(data: any): Observable<any> {
    return this.http.put<any>(`${this.URLbase}/update`, data);
  }

  // Eliminar una relación (física)
  public deleteUserRol(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URLbase}/${id}`);
  }

  // Aquí puedes agregar eliminación lógica si tu backend lo soporta
  // public softDeleteUserRol(id: number): Observable<any> {
  //   return this.http.put<any>(`${this.URLbase}/soft-delete/${id}`, {});
  // }
}
