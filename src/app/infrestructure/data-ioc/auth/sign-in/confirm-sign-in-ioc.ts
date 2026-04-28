import {
  ConfirmSignInInteractor,
  ConfirmSignInRepository,
  IConfirmSignInAdapter,
  IConfirmSignInInteractor,
  IConfirmSignInRepository,
  IPostConfirmSignInUseCase,
  PostConfirmSignInUseCase,
} from '@/app/application';
import { ConfirmSignInAdapter } from '@/app/infrestructure/adapters';
import type { Provider } from '@angular/core';

/**
 * @constant CONFIRM_SIGN_In_PROVIDERS
 * @description
 * Configuración de providers para el flujo de confirmación de registro.
 * Se utiliza `useFactory` sin pasar explícitamente parámetros, confiando en la inyección de Angular.
 */
export const CONFIRM_SIGN_IN_PROVIDERS: Provider[] = [
  {
    provide: IConfirmSignInAdapter,
    useClass: ConfirmSignInAdapter,
  },
  {
    provide: IConfirmSignInRepository,
    useFactory: () => new ConfirmSignInRepository(),
  },
  {
    provide: IPostConfirmSignInUseCase,
    useFactory: () => new PostConfirmSignInUseCase(),
  },
  {
    provide: IConfirmSignInInteractor,
    useFactory: () => new ConfirmSignInInteractor(),
  },
];
