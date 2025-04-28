import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModuleService } from '../../services/module.service';
import { FormService } from '../../services/form.service';
import { ModuleFormService } from '../../services/module-form.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-module-form-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './module-form-update.component.html',
  styleUrls: ['./module-form-update.component.css']
})
export class ModuleFormUpdateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private moduleService = inject(ModuleService);
  private formService = inject(FormService);
  private moduleFormService = inject(ModuleFormService);

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
      next: (modules) => this.modules = modules,
      error: (err) => console.error('Error loading modules', err)
    });
  }

  loadForms(): void {
    this.formService.getAllForm().subscribe({
      next: (forms) => this.forms = forms,
      error: (err) => console.error('Error loading forms', err)
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const { moduleId, formId } = this.form.value;
    const relationData = { moduleId, formId };

    this.moduleFormService.updateModuleForm(this.relationId, relationData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Relación creada correctamente',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/module-form']);
        });
      },
      error: (err) => {
        console.error('Error creating relation', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la relación',
          icon: 'error'
        });
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/module-form']);
  }
}