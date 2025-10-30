import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ErrorHandler, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/errors/global-error.handler';


// 👉 Registrar el idioma español para pipes y formatos
registerLocaleData(localeEs, 'es-ES');

export const appProviders = [
  provideRouter(routes),
  provideHttpClient(withInterceptorsFromDi()),
  provideAnimations(),

  { provide: LOCALE_ID, useValue: 'es-ES' },
  { provide: ErrorHandler, useClass: GlobalErrorHandler }
];
