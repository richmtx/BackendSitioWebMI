import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn, CanMatchFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

function validarSesion(platformId: Object): boolean {
  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const token = localStorage.getItem('accessToken');
  return !!token;
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isAuth = validarSesion(platformId);

  if (!isAuth) {
    return router.createUrlTree(['/login']);
  }

  return true;
};

export const authMatchGuard: CanMatchFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isAuth = validarSesion(platformId);

  return isAuth ? true : router.createUrlTree(['/login']);
};