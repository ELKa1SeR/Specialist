import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
  theme = signal<'light' | 'dark'>('light');

  socialLinks = [
    {
      icon: '💼',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/francisco-javier-liébanas-talavera-a96987105'
    },
    {
      icon: '✉️',
      name: 'Email',
      url: 'mailto:francisco.liebanas@nter.es'
    }
  ];
  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.theme;
  }
}
