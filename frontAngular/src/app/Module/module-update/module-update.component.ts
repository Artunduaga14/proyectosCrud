import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ModuleService } from '../../services/module.service';

// Interface para Person
interface Module {
  id: number;
  name: string;
  description: string;
  status: number;
}

@Component({
  selector: 'app-update-Module',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './module-update.component.html',
  styleUrl: './module-update.component.css'
})
export class UpdateModuleComponent implements OnInit {
  private fb = inject(FormBuilder);
  private moduleService = inject(ModuleService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  moduleId!: number;

  ngOnInit(): void {
    this.moduleId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      id: [this.moduleId],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
    });

    this.loadModuleData();
  }

  loadModuleData(): void {
    this.moduleService.getModuleById(this.moduleId).subscribe({
      next: (module) => {
        console.log('module obtenida:', module);
        this.form.patchValue({
          name: module.name,
          description: module.description,
          status: module.status.toString()
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

    const payload: Module = {
      id: this.moduleId,
      name: formValue.name,
      description: formValue.description,
      status: parseInt(formValue.status)
    };

    console.log('Payload enviado:', payload);
    
    this.moduleService.updateModule(payload).subscribe({
      next: () => {
        alert('Form actualizada con éxito');
        this.router.navigate(['/module']);
      },
      error: (err) => {
        console.error('Error completo:', err);
        alert('Error al actualizar: ' + (err.error?.message || err.message));
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/module']);
  }
}
