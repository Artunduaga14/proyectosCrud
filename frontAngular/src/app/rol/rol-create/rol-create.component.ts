// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-rol-create',
//   imports: [],
//   templateUrl: './rol-create.component.html',
//   styleUrl: './rol-create.component.css'
// })
// export class RolCreateComponent {

// }


import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule, MatLabel, MatHint } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormService } from '../../services/form.service';
import { ModuleService } from '../../services/module.service';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-form-rol',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,],
  templateUrl: './rol-create.component.html',
  styleUrl: './rol-create.component.css'
})
export class FormRolComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private rolService = inject(RolService)
  private router = inject(Router);

  rol: any[] = [];
  noRolsAvailable = false;

  form = this.formBuilder.group({
    Name: ['', Validators.required],
    Description: ['', Validators.required],
    Status:[1]
  });

  ngOnInit(): void {
    this.rolService.getAllRol().subscribe((data) => {
      this.rol = data;
      if (this.rol.length === 0) {
        this.noRolsAvailable = true;
        this.form.disable(); 
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    console.log(this.form.value);
    this.rolService.createRol(this.form.value).subscribe({
      next: () => this.router.navigate(['/rol']),
      error: err => alert("Error al registrar: " + err.message)
    });
  }

  cancelar(): void {
    this.router.navigate(['/rol']);
  }

}



