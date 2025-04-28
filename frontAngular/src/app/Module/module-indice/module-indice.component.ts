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
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-module-indice',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './module-indice.component.html',
  styleUrl: './module-indice.component.css'
})
export class IndiceModuleComponent implements OnInit {
  private moduleService = inject(ModuleService);
  module: any[] = [];
  columnas = ['id', 'moduleName', 'description','acciones'];

  ngOnInit(): void {
    this.cargarModule();
    console.log(this.cargarModule())
  }

  cargarModule(): void {
    this.moduleService.getAllModule().subscribe({
      next: data => this.module = data,
      error: err => console.error("Error cargando usuarios", err)
    });
  }

  eliminarModule(module: any) {
    Swal.fire({
      title: '¿Qué tipo de eliminación deseas?',
      text: `Usuario: ${module.lastName}`,
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
        this.moduleService.deleteModule(module.id).subscribe(() => {
          Swal.fire('Eliminado lógicamente', '', 'success');
          this.cargarModule();
        });
      } else if (result.isDenied) {
        this.moduleService.deleteModule(module.id).subscribe(() => {
          Swal.fire('Eliminado permanentemente', '', 'success');
          this.cargarModule();
        });
      }
    });
  }
}
