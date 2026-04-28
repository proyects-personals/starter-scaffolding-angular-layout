import type { ApplicationConfig } from '@angular/core';
import { provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@/app/presentation/app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { Amplify } from 'aws-amplify';
import { parseAmplifyConfig } from 'aws-amplify/utils';
import amplifyconfig from '../../amplifyconfiguration.json';
import { DataIoc } from '../infrestructure/data-ioc';

/**
 * @function initializeTheme
 * @description Configura la detección automática del tema del SO y sincroniza la clase '.dark'.
 */
function initializeTheme(): void {
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const updateTheme = (isDark: boolean): void => {
    document.documentElement.classList.toggle('dark', isDark);
  };

  updateTheme(darkQuery.matches);
  darkQuery.addEventListener('change', (e) => updateTheme(e.matches));
}

const resourceConfig = parseAmplifyConfig(amplifyconfig);
Amplify.configure(resourceConfig);

/**
 * @constant appConfig
 * @description Configuración centralizada utilizando el nuevo inicializador de aplicaciones.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAppInitializer(() => {
      initializeTheme();
    }),

    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
      ripple: true,
    }),

    ...DataIoc.providers,
  ],
};
