// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-permission-update',
//   imports: [],
//   templateUrl: './permission-update.component.html',
//   styleUrl: './permission-update.component.css'
// })
// export class PermissionUpdateComponent {

// }
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ModuleService } from '../../services/module.service';
import { PermissionService } from '../../services/permission.service';

// Interface para Person
interface Permission {
  id: number;
  name: string;
  description: string;
  status: number;
}

@Component({
  selector: 'app-update-permission',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './permission-update.component.html',
  styleUrl: './permission-update.component.css'
})
export class UpdatePermissionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private permissionService = inject(PermissionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  permissionId!: number;

  ngOnInit(): void {
    this.permissionId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      id: [this.permissionId],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
    });

    this.loadPermissionData();
  }

  loadPermissionData(): void {
    this.permissionService.getPermissionById(this.permissionId).subscribe({
      next: (permission) => {
        console.log('permission obtenida:', permission);
        this.form.patchValue({
          name: permission.name,
          description: permission.description,
          status: permission.status.toString()
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

    const payload: Permission = {
      id: this.permissionId,
      name: formValue.name,
      description: formValue.description,
      status: parseInt(formValue.status)
    };

    console.log('Payload enviado:', payload);
    
    this.permissionService.updatePermission(payload).subscribe({
      next: () => {
        alert('Form actualizada con éxito');
        this.router.navigate(['/permission']);
      },
      error: (err) => {
        console.error('Error completo:', err);
        alert('Error al actualizar: ' + (err.error?.message || err.message));
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/permission']);
  }
}

