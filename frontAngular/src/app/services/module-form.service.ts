// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ModuleFormService {

//   constructor() { }
// }
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ModuleServiceService {

//   constructor() { }
// }

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleFormService {

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/ModuleForm';

  constructor() {}

  // Obtener todas las personas
  public getAllModuleForm(): Observable<any> {
    return this.http.get<any>(`${this.URLbase}`);
  }

  // Obtener una persona por ID
  public getModuleFormById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URLbase}/${id}`);
  }

  // Crear una nueva Modulea
  public createModuleForm(Module: any): Observable<any> {
    return this.http.post<any>(`${this.URLbase}`, Module);
  }

  // Actualizar una Modulea
 // POR ESTO:
 public updateModuleForm(id: number, relation: any): Observable<any> {
  return this.http.put<any>(`${this.URLbase}/${id}`, relation);
}
  // Eliminar (permanentemente) una Modulea
  public deleteModuleForm(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URLbase}/${id}`);
  }

  // Eliminar lógico (si decides habilitar esa acción en el backend)
  public deleteModuleFormLogic(id: number): Observable<any> {
    return this.http.put<any>(`${this.URLbase}/logical/${id}`, {});
  }
}

// Aquí puedes agregar métodos para manejar la lógica de negocio relacionada con las personas
// Por ejemplo, métodos para obtener, crear, actualizar o eliminar personas

