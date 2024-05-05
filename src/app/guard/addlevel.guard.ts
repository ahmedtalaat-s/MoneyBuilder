import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const addlevelGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);


  var isAdmin:boolean =JSON.parse(localStorage.getItem('isAdmin') as string)
  if (isAdmin) {
    return true
  }

  router.navigate([''])
  return false
};
