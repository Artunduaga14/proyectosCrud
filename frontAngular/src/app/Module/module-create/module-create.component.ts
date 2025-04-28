
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule, MatLabel, MatHint } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormService } from '../../services/form.service';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-form-module',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,],
  templateUrl: './module-create.component.html',
  styleUrl: './module-create.component.css'
})
export class FormModuleComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private moduleService = inject(ModuleService)
  private router = inject(Router);

  modules: any[] = [];
  noModulesAvailable = false;

  form = this.formBuilder.group({
    Name: ['', Validators.required],
    Description: ['', Validators.required],
    Status:[1]
  });

  ngOnInit(): void {
    this.moduleService.getAllModule().subscribe((data) => {
      this.modules = data;
      if (this.modules.length === 0) {
        this.noModulesAvailable = true;
        this.form.disable(); 
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    console.log(this.form.value);
    this.moduleService.createModule(this.form.value).subscribe({
      next: () => this.router.navigate(['/module']),
      error: err => alert("Error al registrar: " + err.message)
    });
  }

  cancelar(): void {
    this.router.navigate(['/module']);
  }

}


