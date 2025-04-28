// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PermissionService {

//   constructor() { }
// }
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/Permission';

  constructor() {}

  // Obtener todas las personas
  public getAllPermission(): Observable<any> {
    return this.http.get<any>(`${this.URLbase}`);
  }

  // Obtener una persona por ID
  public getPermissionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URLbase}/${id}`);
  }

  // Crear una nueva Permissiona
  public createPermission(Permission: any): Observable<any> {
    return this.http.post<any>(`${this.URLbase}`, Permission);
  }

  // Actualizar una Permissiona
  public updatePermission(Permission: any): Observable<any> {
    console.log('Actualizando usuario:', Permission);
    return this.http.put<any>(`${this.URLbase}/update`, Permission);
  }

  // Eliminar (permanentemente) una Permissiona
  public deletePermission(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URLbase}/${id}`);
  }

  // Eliminar lógico (si decides habilitar esa acción en el backend)
  public deletePermissionLogic(id: number): Observable<any> {
    return this.http.put<any>(`${this.URLbase}/logical/${id}`, {});
  }
}

// Aquí puedes agregar métodos para manejar la lógica de negocio relacionada con las personas
// Por ejemplo, métodos para obtener, crear, actualizar o eliminar personas

