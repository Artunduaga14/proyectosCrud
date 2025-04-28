import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModuleFormService } from '../../services/module-form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-module-form-indice',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './module-form-indice.component.html',
  styleUrls: ['./module-form-indice.component.css']
})
export class ModuleFormIndiceComponent implements OnInit {
  private moduleFormService = inject(ModuleFormService);
  moduleForms: any[] = [];
  columnas = ['id', 'moduleName', 'formName', 'acciones'];
  loading = true;

  ngOnInit(): void {
    this.cargarModuleForms();
  }

  cargarModuleForms(): void {
    this.loading = true;
    this.moduleFormService.getAllModuleForm().subscribe({
      next: (data) => {
        this.moduleForms = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error cargando relaciones módulo-formulario", err);
        this.loading = false;
      }
    });
  }

  eliminarModuleForm(moduleForm: ModuleFormDto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar la relación entre ${moduleForm.nameModule} y ${moduleForm.nameForm}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.moduleFormService.deleteModuleForm(moduleForm.id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'La relación ha sido eliminada.',
              'success'
            );
            this.cargarModuleForms();
          },
          error: (err) => {
            console.error('Error eliminando relación', err);
            Swal.fire(
              'Error!',
              'No se pudo eliminar la relación.',
              'error'
            );
          }
        });
      }
    });
  }
}

interface ModuleFormDto {
  id: number;
  moduleId: number;
  nameModule: string;
  formId: number;
  nameForm: string;
}