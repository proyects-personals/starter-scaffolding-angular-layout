import {
  IPostResendCodeUseCase,
  IResendCodeAdapter,
  IResendCodeInteractor,
  IResendCodeRepository,
  PostResendCodeUseCase,
  ResendCodeInteractor,
  ResendCodeRepository,
} from '@/app/application';
import { ResendCodeAdapter } from '@/app/infrestructure';
import type { Provider } from '@angular/core';

/**
 * @constant RESEND_CODE_PROVIDERS
 * @version 1.0.0
 * @author Steveen Ordoñez
 * @description
 * Proveedores para el flujo de reenvío de código de verificación.
 * Sigue la cadena de responsabilidad: Adapter -> Repository -> UseCase -> Interactor.
 */
export const RESEND_CODE_PROVIDERS: Provider[] = [
  {
    provide: IResendCodeAdapter,
    useClass: ResendCodeAdapter,
  },
  {
    provide: IResendCodeRepository,
    useFactory: () => new ResendCodeRepository(),
  },
  {
    provide: IPostResendCodeUseCase,
    useFactory: () => new PostResendCodeUseCase(),
  },
  {
    provide: IResendCodeInteractor,
    useFactory: () => new ResendCodeInteractor(),
  },
];
