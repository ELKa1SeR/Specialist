import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'preferred-theme';
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    this.loadTheme();
  }

  /** 🔁 Alterna entre tema claro y oscuro */
  toggleTheme(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /** 🌗 Aplica el tema actual */
  setTheme(theme: 'light' | 'dark'): void {
    this.theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  /** 💾 Carga el tema almacenado o el sistema */
  private loadTheme(): void {
    const storedTheme = localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark' | null;

    if (storedTheme) {
      this.setTheme(storedTheme);
    } else {
      // Detecta preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }
}
