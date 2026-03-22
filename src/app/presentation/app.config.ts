import type { ApplicationConfig } from '@angular/core';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@/app/presentation/app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { Amplify } from 'aws-amplify';
import { parseAmplifyConfig } from 'aws-amplify/utils';
import amplifyconfig from '../../amplifyconfiguration.json';

/**
 * @constant resourceConfig
 * @description
 * Almacena la configuración parseada de AWS Amplify extraída del archivo JSON generado por el CLI.
 * Es crucial para habilitar servicios como Auth (Cognito), API (AppSync) o Storage (S3).
 */
const resourceConfig = parseAmplifyConfig(amplifyconfig);

/**
 * Configuración global de Amplify.
 * Se ejecuta en el nivel superior para asegurar que los servicios estén disponibles
 * antes de que se instancien los componentes de Angular.
 */
Amplify.configure(resourceConfig);

/**
 * @constant appConfig
 * @version 1.0.0
 * @author Steveen Ordoñez
 * @type {ApplicationConfig}
 * @description
 * Objeto de configuración principal de la aplicación Angular.
 * Centraliza la inyección de dependencias para el enrutamiento, la gestión de errores globales
 * y la inicialización del sistema de diseño (Design System).
 */
export const appConfig: ApplicationConfig = {
  /**
   * @property {Provider[]} providers
   * @description
   * Colección de proveedores de servicios globales:
   * 1. **ErrorListeners**: Captura errores globales del navegador para logging/monitoreo.
   * 2. **Router**: Define la estrategia de navegación basada en el archivo `app.routes`.
   * 3. **PrimeNG**: Inicializa la librería de UI con el preset 'Aura' y habilita el efecto visual Ripple.
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
  ],
};
