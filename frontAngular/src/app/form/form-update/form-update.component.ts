import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../../services/form.service';

// Interface para Person
interface Form {
  id: number;
  name: string;
  description: string;
  status: number;
}

@Component({
  selector: 'app-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './form-update.component.html',
  styleUrl: './form-update.component.css'
})
export class UpdateFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private formService = inject(FormService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  formId!: number;

  ngOnInit(): void {
    this.formId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      id: [this.formId],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
    });

    this.loadFormData();
  }

  loadFormData(): void {
    this.formService.getFormById(this.formId).subscribe({
      next: (form) => {
        console.log('form obtenida:', form);
        this.form.patchValue({
          name: form.name,
          description: form.description,
          status: form.status.toString()
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

    const payload: Form = {
      id: this.formId,
      name: formValue.name,
      description: formValue.description,
      status: parseInt(formValue.status)
    };

    console.log('Payload enviado:', payload);
    
    this.formService.updateForm(payload).subscribe({
      next: () => {
        alert('Form actualizada con éxito');
        this.router.navigate(['/form']);
      },
      error: (err) => {
        console.error('Error completo:', err);
        alert('Error al actualizar: ' + (err.error?.message || err.message));
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/form']);
  }
}