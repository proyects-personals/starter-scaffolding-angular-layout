import {
  GetUserInteractor,
  GetUserRepository,
  GetUserUseCase,
  IGetUserAdapter,
  IGetUserInteractor,
  IGetUserRepository,
  IGetUserUseCase,
} from '@/app/application';
import { GetUserAdapter } from '@/app/infrestructure';
import type { Provider } from '@angular/core';

/**
 * @constant GET_USER_PROVIDERS
 * @version 1.0.0
 * @author Steveen Ordoñez
 * @description
 * Proveedores para el flujo de obtención de datos del usuario.
 * Estructura: Adapter -> Repository -> UseCase -> Interactor.
 */
export const GET_USER_PROVIDERS: Provider[] = [
  {
    provide: IGetUserAdapter,
    useClass: GetUserAdapter,
  },
  {
    provide: IGetUserRepository,
    useFactory: () => new GetUserRepository(),
  },
  {
    provide: IGetUserUseCase,
    useFactory: () => new GetUserUseCase(),
  },
  {
    provide: IGetUserInteractor,
    useFactory: () => new GetUserInteractor(),
  },
];
