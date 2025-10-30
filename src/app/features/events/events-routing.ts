import { Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

export const EVENTS_ROUTES: Routes = [
  { path: '', component: EventsComponent },
  { path: ':id', component: EventDetailComponent }
];
