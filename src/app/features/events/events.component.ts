import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from './events.service';
import { SportsEvent } from './event.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events = signal<SportsEvent[]>([]);
  currentPage = signal(1);
  totalPages = signal(38);
  jornadas = signal<number[]>(Array.from({ length: 38 }, (_, i) => i + 1));

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    const jornadaActual = this.calcularJornadaActual();
    this.currentPage.set(jornadaActual);
    this.loadEvents(jornadaActual);
  }

  loadEvents(page: number = 1): void {
    this.eventsService.getEvents(page).subscribe({
      next: (res) => {
        this.events.set(res.laliga);

        this.currentPage.set(page);
      },
      error: (err) => console.error('Error cargando jornada:', err)
    });
  }

  private calcularJornadaActual(): number {
    const fechaInicio = new Date('2025-08-15');
    const hoy = new Date();
    const diffDias = (hoy.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24);
    const jornada = Math.ceil(diffDias / 7);
    return Math.min(Math.max(jornada, 1), 38);
  }

  onSelectJornada(event: Event): void {
    const jornada = Number((event.target as HTMLSelectElement).value);
    this.loadEvents(jornada);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.loadEvents(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.loadEvents(this.currentPage() - 1);
    }
  }

  onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement;
    if (!img || img.src.includes('fallback.png')) return;
    img.src = 'assets/fallback.png';
  }
}
