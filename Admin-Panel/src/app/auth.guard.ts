import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn, CanMatchFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

function validarSesion(): boolean {
  const token = localStorage.getItem('accessToken');
  return !!token;
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return true;

  const isAuth = validarSesion();

  if (!isAuth) {
    localStorage.clear();
    return router.createUrlTree(['/login']);
  }

  return true;
};

export const authMatchGuard: CanMatchFn = () => {
  const router = inject(Router);

  const isAuth = validarSesion();

  return isAuth ? true : router.createUrlTree(['/login']);
};