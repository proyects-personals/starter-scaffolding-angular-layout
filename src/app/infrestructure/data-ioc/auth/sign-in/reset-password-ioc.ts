import {
  IPostResetPasswordUseCase,
  IResetPasswordAdapter,
  IResetPasswordInteractor,
  IResetPasswordRepository,
  PostResetPasswordUseCase,
  ResetPasswordInteractor,
  ResetPasswordRepository,
} from '@/app/application';
import { ResetPasswordAdapter } from '@/app/infrestructure';
import type { Provider } from '@angular/core';

/**
 * @constant RESEND_CODE_PROVIDERS
 * @version 1.0.0
 * @author Steveen Ordoñez
 * @description
 * Proveedores para el flujo de reenvío de código de verificación.
 * Sigue la cadena de responsabilidad: Adapter -> Repository -> UseCase -> Interactor.
 */
export const RESEND_PASSWORK_PROVIDERS: Provider[] = [
  {
    provide: IResetPasswordAdapter,
    useClass: ResetPasswordAdapter,
  },
  {
    provide: IResetPasswordRepository,
    useFactory: () => new ResetPasswordRepository(),
  },
  {
    provide: IPostResetPasswordUseCase,
    useFactory: () => new PostResetPasswordUseCase(),
  },
  {
    provide: IResetPasswordInteractor,
    useFactory: () => new ResetPasswordInteractor(),
  },
];
