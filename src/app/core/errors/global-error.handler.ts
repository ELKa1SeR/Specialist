import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    console.error('🚨 Global error handler:', error);
    alert('Ocurrió un error inesperado. Revisa la consola para más detalles.');
  }
}
