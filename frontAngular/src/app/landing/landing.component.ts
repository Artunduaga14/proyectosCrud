import { Component, inject } from '@angular/core';
import { PurebaConeccionService } from '../pureba-coneccion.service';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  pruebaConexion = inject(PurebaConeccionService);
  users: any[] = [];

  constructor(){
    this.pruebaConexion.obtenerUsers().subscribe(datos => {
      this.users = datos;
      
      console.log(this.users)
    })
  }
}
