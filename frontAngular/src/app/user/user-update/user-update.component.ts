import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UpdateUserComponent implements OnInit{
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  userId!: number;

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      id: [this.userId],
      UserName: ['', Validators.required],
      Password: ['',],
      PersonId: [0], // precargado manual
      Status: ['', Validators.required],
    });

    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        console.log('Usuario obtenido:', user); // Para depuración
        this.form.patchValue({
          UserName: user.userName, // Corregir a userName si así viene del backend
          Password: '', // Dejar vacío por seguridad
          PersonId: user.personId,
          Status: user.status === 1 ? 'true' : 'false', // Convertir número a string
        });
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
        alert('Error al cargar los datos del usuario');
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    
    const formValue = this.form.value;

    const payload: any = {
      id: this.userId,
      userName: formValue.UserName,
      personId: formValue.PersonId,
      status: formValue.Status === 'true'? 1 : 0,
    };
  
     // Solo incluir Password si se proporcionó un valor
  if (formValue.Password && formValue.Password.trim() !== '') {
    payload.Password = formValue.Password;
  }

  console.log('Payload enviado:', payload); // Para depuración
  
  this.userService.updateUser(payload).subscribe({
    next: () => {
      alert('Usuario actualizado con éxito');
      this.router.navigate(['/user']);
    },
    error: (err) => {
      console.error('Error completo:', err);
      alert('Error al actualizar: ' + (err.error?.message || err.message));
    },
  });
}
  
  cancelar(): void {
    this.router.navigate(['/user']);
  }
}
