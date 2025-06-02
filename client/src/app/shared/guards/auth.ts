import { effect, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthDataClient } from '../services/auth.data-client';

// export const authGuard: CanActivateFn = async (route, state) => {
//   const authService = inject(AuthDataClient);
//   const router = inject(Router);
//   const isLoggedin = !!(await authService.fetchCurrentUser());
//   if (!isLoggedin) {
//     router.navigateByUrl('/signin');
//   }
//   return isLoggedin;
// };

// Version pour Angular 20 httpResource
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthDataClient);
  const router = inject(Router);

  // Le garde retourne une nouvelle Promesse.
  // Le routeur attendra la résolution de cette Promesse pour décider d'activer ou non la route.
  // La Promesse se résoudra avec `true` (autoriser), `false` (bloquer), ou un `UrlTree` (rediriger).
  return new Promise<boolean | UrlTree>((resolve) => {
    const effectRef = effect(
      () => {
        // On exécute le code à l'intérieur de l'effet seulement quand `currentUserResource` n'est plus en cours de chargement.
        if (!authService.currentUserResource.isLoading()) {
          // L'effet a rempli son rôle (la vérification de l'état de chargement),
          // on le détruit donc manuellement pour éviter des exécutions inutiles ou des fuites de mémoire.
          effectRef.destroy();

          // On vérifie si l'utilisateur est actuellement connecté en appelant la méthode `isLoggedin` du service d'authentification.
          const isLoggedIn = authService.isLoggedin();

          if (!isLoggedIn) {
            // CAS 1: L'utilisateur N'EST PAS connecté.
            // On résout la Promesse avec un UrlTree qui indique au routeur de rediriger vers '/signin'.
            resolve(router.createUrlTree(['/signin']));
          } else {
            // CAS 2: L'utilisateur EST connecté.
            // On résout la Promesse avec `true`, ce qui autorise l'accès à la route.
            resolve(true);
          }
        }
      },
      { manualCleanup: true }
    ); // `manualCleanup: true` indique que nous sommes responsables de la destruction de l'effet.
  });
};
