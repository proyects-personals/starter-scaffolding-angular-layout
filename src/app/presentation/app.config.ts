import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@/app/presentation/app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { Amplify } from 'aws-amplify';
import { parseAmplifyConfig } from 'aws-amplify/utils';
import amplifyconfig from '../../amplifyconfiguration.json';
import { DataIoc } from '../infrestructure/data-ioc';

/**
 * @constant resourceConfig
 * @description
 * Almacena la configuración parseada de AWS Amplify.
 * Crucial para habilitar Auth (Cognito) y API (AppSync).
 */
const resourceConfig = parseAmplifyConfig(amplifyconfig);

/**
 * Configuración global de AWS Amplify.
 * Se inicializa antes del arranque de Angular para garantizar disponibilidad de servicios.
 */
Amplify.configure(resourceConfig);

/**
 * @constant appConfig
 * @version 1.1.0
 * @author Steveen Ordoñez
 * @type {ApplicationConfig}
 * @description
 * Punto de entrada único para la configuración de la aplicación.
 * Orquestra el Router, PrimeNG, Manejo de Errores y la Inyección de Dependencias (IoC).
 */
export const appConfig: ApplicationConfig = {
  /**
   * @property {Provider[]} providers
   * @description
   * Registro de servicios globales y lógica de negocio:
   * 1. **Core Services**: Enrutamiento y listeners de errores.
   * 2. **UI Design System**: PrimeNG con temática Aura.
   * 3. **Clean Architecture IoC**: Inyección masiva de interactores y casos de uso.
   */
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      ripple: true,
    }),
    ...DataIoc.providers,
  ],
};
