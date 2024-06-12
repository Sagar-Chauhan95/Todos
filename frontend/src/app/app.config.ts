import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { addTokenInterceptor } from './authentication/add-token.interceptor';
import { provideToastr } from 'ngx-toastr';
import { AuthService } from './auth.service';

const bootstrap = () => {
  const authService = inject(AuthService);
  return () => {
    const persisted_data = localStorage.getItem('record');
    if (persisted_data) {
      authService.$state.set(JSON.parse(persisted_data));
    }
  };

};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptors([ addTokenInterceptor ])),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideAnimationsAsync(),
    provideToastr(),
    { provide: APP_INITIALIZER, useFactory: bootstrap, multi: true }
  ]
};
