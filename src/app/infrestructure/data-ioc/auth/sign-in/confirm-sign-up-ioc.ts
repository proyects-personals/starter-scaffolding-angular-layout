import type { Provider } from '@angular/core';
import {
  IConfirmSignUpAdapter,
  IConfirmSignUpRepository,
  IPostConfirmSignUpUseCase,
  IConfirmSignUpInteractor,
  ConfirmSignUpRepository,
  PostConfirmSignUpUseCase,
  ConfirmSignUpInteractor,
} from '@/app/application';
import { ConfirmSignUpAdapter } from '@/app/infrestructure';

/**
 * @constant CONFIRM_SIGN_UP_PROVIDERS
 * @description
 * Configuración de providers para el flujo de confirmación de registro.
 * Se utiliza `useFactory` sin pasar explícitamente parámetros, confiando en la inyección de Angular.
 */
export const CONFIRM_SIGN_UP_PROVIDERS: Provider[] = [
  {
    provide: IConfirmSignUpAdapter,
    useClass: ConfirmSignUpAdapter,
  },
  {
    provide: IConfirmSignUpRepository,
    useFactory: () => new ConfirmSignUpRepository(),
  },
  {
    provide: IPostConfirmSignUpUseCase,
    useFactory: () => new PostConfirmSignUpUseCase(),
  },
  {
    provide: IConfirmSignUpInteractor,
    useFactory: () => new ConfirmSignUpInteractor(),
  },
];
