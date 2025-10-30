import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EventResponse, SportsEvent } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly baseUrl = 'http://localhost:3000/laliga';

  constructor(private http: HttpClient) {}

  /** 🔹 Todos los partidos (con paginación local simulada) */
  getEvents(page = 1, limit = 10): Observable<EventResponse> {
    return this.http.get<SportsEvent[]>(this.baseUrl).pipe(
      map((events) => {
        const total = events.length;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const paginated = events.slice(start, start + limit);

        return {
          laliga: paginated,
          total,
          current_page: page,
          total_pages: totalPages
        };
      })
    );
  }

  /** 🔹 Obtener partido por ID */
  getEventById(id: number): Observable<SportsEvent> {
    return this.http.get<SportsEvent>(`${this.baseUrl}/${id}`);
  }

  /** 🔹 Filtrar por jornada */
  getByMatchday(matchday: number): Observable<SportsEvent[]> {
    return this.http.get<SportsEvent[]>(`${this.baseUrl}?matchday=${matchday}`);
  }
}
