import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/Person';

  constructor() {}

  // Obtener todas las personas
  public getAllPersons(): Observable<any> {
    return this.http.get<any>(`${this.URLbase}`);
  }

  // Obtener una persona por ID
  public getPersonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URLbase}/${id}`);
  }

  // Crear una nueva persona
  public createPerson(person: any): Observable<any> {
    return this.http.post<any>(`${this.URLbase}`, person);
  }

  // Actualizar una persona
  public updatePerson(person: any): Observable<any> {
    return this.http.put<any>(`${this.URLbase}/update`, person);
  }

  // Eliminar (permanentemente) una persona
  public deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URLbase}/${id}`);
  }

  // Eliminar lógico (si decides habilitar esa acción en el backend)
  public deletePersonLogic(id: number): Observable<any> {
    return this.http.put<any>(`${this.URLbase}/logical/${id}`, {});
  }
}

// Aquí puedes agregar métodos para manejar la lógica de negocio relacionada con las personas
// Por ejemplo, métodos para obtener, crear, actualizar o eliminar personas