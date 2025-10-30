import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  theme = signal<'light' | 'dark'>('light');

  // simulamos un menú de rutas dinámico
  navLinks = [
    { label: 'Inicio', path: '/home' },
    { label: 'Eventos', path: '/events' },
    { label: 'Acerca', path: '/about' }
  ];

  constructor(private themeService: ThemeService) {
     this.theme = this.themeService.theme;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
