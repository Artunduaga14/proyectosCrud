// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-module-form-create',
//   imports: [],
//   templateUrl: './module-form-create.component.html',
//   styleUrl: './module-form-create.component.css'
// })
// export class ModuleFormCreateComponent {

// }
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModuleFormService } from '../../services/module-form.service';
import { ModuleService } from '../../services/module.service';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-form-create',
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
  templateUrl: './module-form-create.component.html',
  styleUrls: ['./module-form-create.component.css']
})
export class ModuleFormCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private moduleFormService = inject(ModuleFormService);
  private moduleService = inject(ModuleService);
  private formService = inject(FormService);
  private router = inject(Router);

  form!: FormGroup;
  modules: any[] = [];
  forms: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.initializeForm();
    this.loadModules();
    this.loadForms();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      moduleId: ['', Validators.required],
      formId: ['', Validators.required]
    });
  }

  loadModules(): void {
    this.moduleService.getAllModule().subscribe({
      next: (data) => this.modules = data,
      error: (err) => console.error('Error cargando módulos', err)
    });
  }

  loadForms(): void {
    this.formService.getAllForm().subscribe({
      next: (data) => this.forms = data,
      error: (err) => console.error('Error cargando formularios', err)
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = this.form.value;

    this.moduleFormService.createModuleForm(formData).subscribe({
      next: () => {
        this.router.navigate(['/module-form']);
      },
      error: (err) => {
        console.error('Error creando relación', err);
        this.loading = false;
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/module-form']);
  }
}
