import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { langInterceptor } from './core/interceptors/lang.interceptor';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { MyTranslateLoader } from './translate-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withInMemoryScrolling({scrollPositionRestoration: 'top'}),
      withViewTransitions()
    ), 
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([langInterceptor])
    ),
    provideToastr(),
    provideAnimations(),
    provideTranslateLoader(MyTranslateLoader),
    ...provideTranslateService({
      fallbackLang: 'en'    })
  ]
};
