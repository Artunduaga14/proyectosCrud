import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-module-form-update',
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
  private route = inject(ActivatedRoute); 

  form!: FormGroup;
  modules: any[] = [];
  forms: any[] = [];
  relationId!: number; // <-- ID de la relación que vamos a actualizar
  loading = false;

  ngOnInit(): void {
    this.relationId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadModules();
    this.loadForms();
    this.loadRelation(); // <-- Cargamos la relación existente para editarla
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

  loadRelation(): void {
    this.moduleFormService.getModuleFormById(this.relationId).subscribe({
      next: (relation) => {
        this.form.patchValue({
          moduleId: relation.moduleId,
          formId: relation.formId
        });
      },
      error: (err) => {
        console.error('Error loading relation', err);
        Swal.fire('Error', 'No se pudo cargar la relación', 'error');
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const { moduleId, formId } = this.form.value;
    const relationData = {
      id: this.relationId, // <-- Aquí metemos el ID
      moduleId,
      formId
    };

    this.moduleFormService.updateModuleForm(relationData).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Relación actualizada correctamente', 'success').then(() => {
          this.router.navigate(['/module-form']);
        });
      },
      error: (err) => {
        console.error('Error updating relation', err);
        Swal.fire('Error', 'No se pudo actualizar la relación', 'error');
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/module-form']);
  }
}
