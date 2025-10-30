import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../events.service';
import { SportsEvent } from '../event.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event?: SportsEvent;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.eventsService.getEventById(id).subscribe({
        next: (data) => {
          this.event = data;
          this.loading = false;
        },
        error: () => {
          Swal.fire('Error', 'No se encontró el evento', 'error');
          this.router.navigate(['/events']);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }

  editEvent(): void {
    if (this.event) {
      this.router.navigate(['/events/edit', this.event.id]);
    }
  }


  deleteEvent(): void {
    Swal.fire({
      title: '¿Eliminar evento?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed && this.event) {
        this.eventsService.getEvents(this.event.id).subscribe(() => {
          Swal.fire('Eliminado', 'El evento ha sido eliminado', 'success');
          this.goBack();
        });
      }
    });
  }
}
