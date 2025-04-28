// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-permission-create',
//   imports: [],
//   templateUrl: './permission-create.component.html',
//   styleUrl: './permission-create.component.css'
// })
// export class PermissionCreateComponent {

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
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-form-permission',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,],
  templateUrl: './permission-create.component.html',
  styleUrl: './permission-create.component.css'
})
export class FormPermissionComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private permissionService = inject(PermissionService)
  private router = inject(Router);

  permissions: any[] = [];
  noPermissionsAvailable = false;

  form = this.formBuilder.group({
    Name: ['', Validators.required],
    Description: ['', Validators.required],
    Status:[1]
  });

  ngOnInit(): void {
    this.permissionService.getAllPermission().subscribe((data) => {
      this.permissions = data;
      if (this.permissions.length === 0) {
        this.noPermissionsAvailable = true;
        this.form.disable(); 
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    console.log(this.form.value);
    this.permissionService.createPermission(this.form.value).subscribe({
      next: () => this.router.navigate(['/permission']),
      error: err => alert("Error al registrar: " + err.message)
    });
  }

  cancelar(): void {
    this.router.navigate(['/permission']);
  }

}



