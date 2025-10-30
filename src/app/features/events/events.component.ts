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
  totalPages = signal(1);

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(page: number = 1): void {
    this.eventsService.getEvents(page).subscribe((res) => {
      this.events.set(res.laliga);
      this.totalPages.set(res.total_pages ?? 1);
      this.currentPage.set(res.current_page ?? 1);
    });
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


onImgError(ev: Event) {
  const img = ev.target as HTMLImageElement;
  if (!img || img.src.endsWith('/assets/fallback.png')) return; // evita bucle infinito
  img.src = 'assets/fallback.png';
}



}
