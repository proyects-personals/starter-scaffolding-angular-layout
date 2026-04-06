import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of, from } from 'rxjs';
import { getCurrentUser } from 'aws-amplify/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  return from(getCurrentUser()).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/onboarding/auth/sign-in']);
      return of(false);
    })
  );
};