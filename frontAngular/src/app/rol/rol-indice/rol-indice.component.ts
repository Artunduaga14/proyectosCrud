// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-rol-indice',
//   imports: [],
//   templateUrl: './rol-indice.component.html',
//   styleUrl: './rol-indice.component.css'
// })
// export class RolIndiceComponent {

// }
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-module-indice',
//   imports: [],
//   templateUrl: './module-indice.component.html',
//   styleUrl: './module-indice.component.css'
// })
// export class ModuleIndiceComponent {

// }
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-rol-indice',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './rol-indice.component.html',
  styleUrl: './rol-indice.component.css'
})
export class IndiceRolComponent implements OnInit {
  private rolService = inject(RolService);
  rol: any[] = [];
  columnas = ['id', 'rolName', 'description','acciones'];

  ngOnInit(): void {
    this.cargarRol();
    console.log(this.cargarRol())
  }

  cargarRol(): void {
    this.rolService.getAllRol().subscribe({
      next: data => this.rol = data,
      error: err => console.error("Error cargando usuarios", err)
    });
  }

  eliminarRol(rol: any) {
    Swal.fire({
      title: '¿Qué tipo de eliminación deseas?',
      text: `Usuario: ${rol.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Lógica',
      denyButtonText: 'Permanente',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        this.rolService.deleteRol(rol.id).subscribe(() => {
          Swal.fire('Eliminado lógicamente', '', 'success');
          this.cargarRol();
        });
      } else if (result.isDenied) {
        this.rolService.deleteRol(rol.id).subscribe(() => {
          Swal.fire('Eliminado permanentemente', '', 'success');
          this.cargarRol();
        });
      }
    });
  }
}

