import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { AuthStore } from './store/auth-store.service';
import { authInterceptor } from './interceptors/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withInterceptors([authInterceptor])
        ),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes), provideAnimationsAsync(),
        provideStore()
    ]
};
