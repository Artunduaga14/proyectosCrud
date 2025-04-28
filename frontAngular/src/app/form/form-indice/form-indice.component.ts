import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-indice',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './form-indice.component.html',
  styleUrl: './form-indice.component.css'
})
export class IndiceFormComponent implements OnInit {
  private formService = inject(FormService);
  form: any[] = [];
  columnas = ['id', 'formName', 'description','acciones'];

  ngOnInit(): void {
    this.cargarForm();
    console.log(this.cargarForm())
  }

  cargarForm(): void {
    this.formService.getAllForm().subscribe({
      next: data => this.form = data,
      error: err => console.error("Error cargando usuarios", err)
    });
  }

  eliminarForm(form: any) {
    Swal.fire({
      title: '¿Qué tipo de eliminación deseas?',
      text: `Usuario: ${form.lastName}`,
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
        this.formService.deleteForm(form.id).subscribe(() => {
          Swal.fire('Eliminado lógicamente', '', 'success');
          this.cargarForm();
        });
      } else if (result.isDenied) {
        this.formService.deleteForm(form.id).subscribe(() => {
          Swal.fire('Eliminado permanentemente', '', 'success');
          this.cargarForm();
        });
      }
    });
  }
}
