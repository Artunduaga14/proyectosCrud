import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserRolService } from '../../services/usiario-rol.service';

@Component({
  selector: 'app-user-rol-indice',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user-rol-indice.component.html',
  styleUrls: ['./user-rol-indice.component.css']
})
export class UserRolIndiceComponent implements OnInit {
  private userRolService = inject(UserRolService);
  userRols: UserRolDto[] = [];
  columnas = ['id', 'userName', 'rolName', 'acciones'];
  loading = true;

  ngOnInit(): void {
    this.cargarUserRols();
  }

  cargarUserRols(): void {
    this.loading = true;
    this.userRolService.getAllUserRoles().subscribe({
      next: (data) => {
        this.userRols = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando relaciones usuario-rol', err);
        this.loading = false;
      }
    });
  }

  eliminarUserRol(userRol: UserRolDto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar la relación entre el usuario ${userRol.userName} y el rol ${userRol.rolName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userRolService.deleteUserRol(userRol.id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'La relación ha sido eliminada.', 'success');
            this.cargarUserRols();
          },
          error: (err) => {
            console.error('Error eliminando relación', err);
            Swal.fire('Error', 'No se pudo eliminar la relación.', 'error');
          }
        });
      }
    });
  }
}

interface UserRolDto {
  id: number;
  userId: number;
  userName: string;
  rolId: number;
  rolName: string;
}
