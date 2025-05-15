import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../services/user.service';
import { RolService } from '../../services/rol.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRolService } from '../../services/usiario-rol.service';

@Component({
  selector: 'app-user-rol-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-rol-create.component.html',
  styleUrls: ['./user-rol-create.component.css']
})
export class UserRolCreateComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private userRolService = inject(UserRolService);
  private userService = inject(UserService);
  private rolService = inject(RolService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  user: any[] = [];
  roles: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsersAndRoles();
  }
   
  ngOnChanges(): void {
    this.loadUsersAndRoles();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      rolId: ['', Validators.required]
    });
  }

  loadUsersAndRoles(): void {
    this.loading = true;
    
    // Cargar usuarios y roles en paralelo
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log('Usuarios cargados:', users);
        this.user = users;
        this.loadRoles();
      },
      error: (err) => {
        console.error('Error cargando usuarios:', err);
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  loadRoles(): void {
    this.rolService.getAllRol().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando roles:', err);
        this.snackBar.open('Error al cargar roles', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = this.form.value;

    this.userRolService.createUserRol(formData).subscribe({
      next: () => {
        this.snackBar.open('Relación creada exitosamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/user-rol']);
      },
      error: (err) => {
        console.error('Error creando relación:', err);
        this.snackBar.open('Error al crear relación', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/user-rol']);
  }
}