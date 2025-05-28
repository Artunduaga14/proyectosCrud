import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/Auth/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-indice',
  templateUrl: './login-indice.component.html',
  styleUrl: './login-indice.component.css',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
})
export class LoginIndiceComponent {

  private loginService = inject(LoginService);
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    userName: [''],
    password: [''],
  });

  constructor(private router: Router) {}

  login() {
    const { userName, password } = this.form.value;
  
    this.loginService.login(userName ?? '', password ?? '').subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        // alert(`Bienvenido ${userName ?? ''}!`);
        this.loginService.saveToken(response.token);
        this.router.navigate(['/user']);
      },
      error: (error) => {
        console.error('Error en el login:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          confirmButtonText: 'Aceptar',
        })
      }
    });
  }
  
}
