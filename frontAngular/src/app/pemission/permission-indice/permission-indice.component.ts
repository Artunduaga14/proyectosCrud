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
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-permission-indice',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './permission-indice.component.html',
  styleUrl: './permission-indice.component.css'
})
export class IndicePermissionComponent implements OnInit {
  private permissionService = inject(PermissionService);
  permission: any[] = [];
  columnas = ['id', 'permissionName', 'description','acciones'];

  ngOnInit(): void {
    this.cargarPermission();
    console.log(this.cargarPermission())
  }

  cargarPermission(): void {
    this.permissionService.getAllPermission().subscribe({
      next: data => this.permission = data,
      error: err => console.error("Error cargando usuarios", err)
    });
  }

  eliminarPermission(permission: any) {
    Swal.fire({
      title: '¿Qué tipo de eliminación deseas?',
      text: `Usuario: ${permission.lastName}`,
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
        this.permissionService.deletePermission(permission.id).subscribe(() => {
          Swal.fire('Eliminado lógicamente', '', 'success');
          this.cargarPermission();
        });
      } else if (result.isDenied) {
        this.permissionService.deletePermission(permission.id).subscribe(() => {
          Swal.fire('Eliminado permanentemente', '', 'success');
          this.cargarPermission();
        });
      }
    });
  }
}
