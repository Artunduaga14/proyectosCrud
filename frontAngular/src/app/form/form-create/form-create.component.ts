// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-form-create',
//   imports: [],
//   templateUrl: './form-create.component.html',
//   styleUrl: './form-create.component.css'
// })
// export class FormCreateComponent {

// }

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
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.css'
})
export class FormFormsComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private formService = inject(FormService)
  private router = inject(Router);

  forms: any[] = [];
  noFormsAvailable = false;

  form = this.formBuilder.group({
    Name: ['', Validators.required],
    Description: ['', Validators.required],
    Status:[1]
  });

  ngOnInit(): void {
    this.formService.getAllForm().subscribe((data) => {
      this.forms = data;
      if (this.forms.length === 0) {
        this.noFormsAvailable = true;
        this.form.disable(); 
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    console.log(this.form.value);
    this.formService.createForm(this.form.value).subscribe({
      next: () => this.router.navigate(['/form']),
      error: err => alert("Error al registrar: " + err.message)
    });
  }

  cancelar(): void {
    this.router.navigate(['/form']);
  }

}

