// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-person-create',
//   imports: [],
//   templateUrl: './person-create.component.html',
//   styleUrl: './person-create.component.css'
// })
// export class PersonCreateComponent {

// }
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule, MatLabel, MatHint } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-form-person',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,],
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.css'
})
export class FormPersonComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private personService = inject(PersonService)
  private router = inject(Router);

  persons: any[] = [];
  noPersonsAvailable = false;

  form = this.formBuilder.group({
    Name: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Identification: ['', Validators.required],
    Age: ['', Validators.required],
    Status:[1]
  });

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe((data) => {
      this.persons = data;
      if (this.persons.length === 0) {
        this.noPersonsAvailable = true;
        this.form.disable(); 
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    console.log(this.form.value);
    this.personService.createPerson(this.form.value).subscribe({
      next: () => this.router.navigate(['/person']),
      error: err => alert("Error al registrar: " + err.message)
    });
  }

  cancelar(): void {
    this.router.navigate(['/person']);
  }

}
