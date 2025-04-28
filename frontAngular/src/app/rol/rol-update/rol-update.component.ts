// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-rol-update',
//   imports: [],
//   templateUrl: './rol-update.component.html',
//   styleUrl: './rol-update.component.css'
// })
// export class RolUpdateComponent {

// }
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ModuleService } from '../../services/module.service';
import { RolService } from '../../services/rol.service';

// Interface para Person
interface Rol {
  id: number;
  name: string;
  description: string;
  status: number;
}

@Component({
  selector: 'app-update-rol',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './rol-update.component.html',
  styleUrl: './rol-update.component.css'
})
export class UpdateRolComponent implements OnInit {
  private fb = inject(FormBuilder);
  private rolService = inject(RolService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  rolId!: number;

  ngOnInit(): void {
    this.rolId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      id: [this.rolId],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
    });

    this.loadRolData();
  }

  loadRolData(): void {
    this.rolService.getRolById(this.rolId).subscribe({
      next: (rol) => {
        console.log('module obtenida:', rol);
        this.form.patchValue({
          name: rol.name,
          description: rol.description,
          status: rol.status.toString()
        });
      },
      error: (err) => {
        console.error('Error al obtener form:', err);
        alert('Error al cargar los datos de la form');
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido:', this.form.errors);
      return;
    }

    const formValue = this.form.value;
    console.log('Valores del formulario:', formValue);

    const payload: Rol = {
      id: this.rolId,
      name: formValue.name,
      description: formValue.description,
      status: parseInt(formValue.status)
    };

    console.log('Payload enviado:', payload);
    
    this.rolService.updateRol(payload).subscribe({
      next: () => {
        alert('Form actualizada con éxito');
        this.router.navigate(['/rol']);
      },
      error: (err) => {
        console.error('Error completo:', err);
        alert('Error al actualizar: ' + (err.error?.message || err.message));
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/rol']);
  }
}

