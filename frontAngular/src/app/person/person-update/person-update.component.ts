import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PersonService } from '../../services/person.service';

// Interface para Person
interface Person {
  id: number;
  name: string;
  lastName: string;
  email: string;
  identification: string;
  age: number;
  status: number;
}

@Component({
  selector: 'app-update-person',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './person-update.component.html',
  styleUrl: './person-update.component.css'
})
export class UpdatePersonComponent implements OnInit {
  private fb = inject(FormBuilder);
  private personService = inject(PersonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form!: FormGroup;
  personId!: number;

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      id: [this.personId],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      identification: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0), Validators.max(120)]],
      status: ['1', Validators.required],
    });

    this.loadPersonData();
  }

  loadPersonData(): void {
    this.personService.getPersonById(this.personId).subscribe({
      next: (person) => {
        console.log('Persona obtenida:', person);
        this.form.patchValue({
          name: person.name,
          lastName: person.lastName,
          email: person.email,
          identification: person.identification,
          age: person.age,
          status: person.status.toString()
        });
      },
      error: (err) => {
        console.error('Error al obtener persona:', err);
        alert('Error al cargar los datos de la persona');
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

    const payload: Person = {
      id: this.personId,
      name: formValue.name,
      lastName: formValue.lastName,
      email: formValue.email,
      identification: formValue.identification,
      age: formValue.age,
      status: parseInt(formValue.status)
    };

    console.log('Payload enviado:', payload);

    this.personService.updatePerson(payload).subscribe({
      next: () => {
        alert('Persona actualizada con éxito');
        this.router.navigate(['/person']);
      },
      error: (err) => {
        console.error('Error completo:', err);
        alert('Error al actualizar: ' + (err.error?.message || err.message));
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/person']);
  }
}