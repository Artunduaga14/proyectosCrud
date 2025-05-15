
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

// Servicios (ajusta las rutas si las tienes distintas)
import { UserService } from '../../services/user.service';
import { RolService } from '../../services/rol.service';
import { UserRolService } from '../../services/usiario-rol.service';


@Component({
  selector: 'app-user-rol-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-rol-update.component.html',
  styleUrls: ['./user-rol-update.component.css']
})
export class UsuarioRolUpdateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private rolService = inject(RolService);
  private userRolService = inject(UserRolService);
  private route = inject(ActivatedRoute); 

  form!: FormGroup;
  user: any[] = [];
  roles: any[] = [];
  relationId!: number;
  loading = false;

  ngOnInit(): void {
    this.relationId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loaduser();
    this.loadRoles();
    this.loadRelation();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      rolId: ['', Validators.required]
    });
  }

  loaduser(): void {
    this.userService.getAllUsers().subscribe({
      next: (user) => {
        console.log('user cargados:', user);
        this.user = user;
      },
      error: (err) => console.error('Error al cargar user', err)
    });
  }

  loadRoles(): void {
    this.rolService.getAllRol().subscribe({
      next: (roles) => {
        console.log('Roles cargados:', roles);
        this.roles = roles;
      },
      error: (err) => console.error('Error al cargar roles', err)
    });
  }

  loadRelation(): void {
    this.userRolService.getUserRolById(this.relationId).subscribe({
      next: (relation) => {
        this.form.patchValue({
          userId: relation.userId,
          rolId: relation.rolId
        });
      },
      error: (err) => {
        console.error('Error al cargar la relación', err);
        Swal.fire('Error', 'No se pudo cargar la relación', 'error');
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const { userId, rolId } = this.form.value;
    const relationData = {
      id: this.relationId,
      userId,
      rolId
    };

    this.userRolService.updateUserRol(relationData).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Relación actualizada correctamente', 'success').then(() => {
          this.router.navigate(['/user-rol']);
        });
      },
      error: (err) => {
        console.error('Error al actualizar la relación', err);
        Swal.fire('Error', 'No se pudo actualizar la relación', 'error');
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/user-rol']);
  }
}

