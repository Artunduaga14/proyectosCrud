import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { LoginService } from '../services/Auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  private authService = inject(LoginService);

  logout() {
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Sí, Cerrar Sesión",
      confirmButtonColor: "#d33",
      cancelButtonText: "No, Quedarme"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire("Sesión cerrada", "", "success");
      }
    });
  }

}