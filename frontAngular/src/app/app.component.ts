import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'api_publica';
  private router = inject(Router);

  get mostrarMenu(): boolean {
    const rutasOcultas = ['/login'];
    return !rutasOcultas.some(r => this.router.url.startsWith(r));
  }
}
