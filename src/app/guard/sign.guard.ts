import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const signGuard: CanActivateFn = (route, state) => {
    let router = inject(Router);

  if (localStorage.getItem('userToken')) {
    router.navigate([''])
    return false
  }

  return true
};
