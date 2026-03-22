import {
  IPostSignInUseCase,
  ISignUpAdapter,
  ISignUpInteractor,
  ISignUpRepository,
  PostSignInUseCase,
  SignUpInteractor,
  SignupRepository,
} from '@/app/application';
import { SignUpAdapter } from '@/app/infrestructure';
import type { Provider } from '@angular/core';

/**
 * @constant RESEND_CODE_PROVIDERS
 * @version 1.0.0
 * @author Steveen Ordoñez
 * @description
 * Proveedores para el flujo de reenvío de código de verificación.
 * Sigue la cadena de responsabilidad: Adapter -> Repository -> UseCase -> Interactor.
 */
export const SIGN_UP_PROVIDERS: Provider[] = [
  {
    provide: ISignUpAdapter,
    useClass: SignUpAdapter,
  },
  {
    provide: ISignUpRepository,
    useFactory: () => new SignupRepository(),
  },
  {
    provide: IPostSignInUseCase,
    useFactory: () => new PostSignInUseCase(),
  },
  {
    provide: ISignUpInteractor,
    useFactory: () => new SignUpInteractor(),
  },
];
