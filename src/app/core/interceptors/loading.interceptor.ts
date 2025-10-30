import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('⏳ Loading started:', req.url);
  return next(req).pipe(
    finalize(() => {
      console.log('✅ Loading finished:', req.url);
    })
  );
};
