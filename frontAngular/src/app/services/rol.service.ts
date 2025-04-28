// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class RolService {

//   constructor() { }
// }

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/Rol';

  constructor() {}

  // Obtener todas las personas
  public getAllRol(): Observable<any> {
    return this.http.get<any>(`${this.URLbase}`);
  }

  // Obtener una persona por ID
  public getRolById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URLbase}/${id}`);
  }

  // Crear una nueva Rola
  public createRol(Rol: any): Observable<any> {
    return this.http.post<any>(`${this.URLbase}`, Rol);
  }

  // Actualizar una Rola
  public updateRol(Rol: any): Observable<any> {
    console.log('Actualizando usuario:', Rol);
    return this.http.put<any>(`${this.URLbase}/update`, Rol);
  }

  // Eliminar (permanentemente) una Rola
  public deleteRol(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URLbase}/${id}`);
  }

  // Eliminar lógico (si decides habilitar esa acción en el backend)
  public deleteRolLogic(id: number): Observable<any> {
    return this.http.put<any>(`${this.URLbase}/logical/${id}`, {});
  }
}

