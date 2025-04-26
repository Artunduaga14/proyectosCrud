// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-person-indice',
//   imports: [],
//   templateUrl: './person-indice.component.html',
//   styleUrl: './person-indice.component.css'
// })
// export class PersonIndiceComponent {

// }
import { Component, inject, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-person-indice',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './person-indice.component.html',
  styleUrl: './person-indice.component.css'
})
export class IndicePersonComponent implements OnInit {
  private personService = inject(PersonService);
  personas: any[] = [];
  columnas = ['id', 'personName', 'lastName', 'email','identification','age','acciones'];

  ngOnInit(): void {
    this.cargarPerson();
    console.log(this.cargarPerson())
  }


  cargarPerson(): void {
    this.personService.getAllPersons().subscribe({
      next: data => this.personas = data,
      error: err => console.error("Error cargando usuarios", err)
    });
  }

  eliminarPersona(person: any) {
    Swal.fire({
      title: '¿Qué tipo de eliminación deseas?',
      text: `Usuario: ${person.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Lógica',
      denyButtonText: 'Permanente',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        this.personService.deletePerson(person.id).subscribe(() => {
          Swal.fire('Eliminado lógicamente', '', 'success');
          this.cargarPerson();
        });
      } else if (result.isDenied) {
        this.personService.deletePerson(person.id).subscribe(() => {
          Swal.fire('Eliminado permanentemente', '', 'success');
          this.cargarPerson();
        });
      }
    });
  }
}
