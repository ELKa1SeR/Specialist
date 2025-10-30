// main.ts
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es-ES');

import { bootstrapApplication } from '@angular/platform-browser';

import { appProviders } from './app/app.providers';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: appProviders
}).catch(err => console.error(err));
