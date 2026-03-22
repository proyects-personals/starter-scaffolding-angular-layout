import {
  IPostSignInUseCase,
  ISignInAdapter,
  ISignInInteractor,
  ISignInRepository,
  PostSignInUseCase,
  SignInInteractor,
  SignInRepository,
} from '@/app/application';
import { SignInAdapter } from '@/app/infrestructure';
import type { Provider } from '@angular/core';

/**
 * @constant SING_IN_PROVIDERS
 * @version 1.0.0
 * @author Steveen Ordoñez
 * @description
 * Arreglo de proveedores para el flujo de Inicio de Sesión (Login).
 * Implementa la cadena de dependencias: Adapter -> Repository -> UseCase -> Interactor.
 */
export const SING_IN_PROVIDERS: Provider[] = [
  {
    provide: ISignInAdapter,
    useClass: SignInAdapter,
  },
  {
    provide: ISignInRepository,
    useFactory: () => new SignInRepository(),
  },
  {
    provide: IPostSignInUseCase,
    useFactory: () => new PostSignInUseCase(),
  },
  {
    provide: ISignInInteractor,
    useFactory: () => new SignInInteractor(),
  },
];
