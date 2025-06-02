import { effect, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
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
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthDataClient);
  const router = inject(Router);

  // 1. Vérifier la valeur actuelle du signal isLoading.
  //    authService.currentUserResource.isLoading est un signal, donc isLoading() pour lire sa valeur.
  if (authService.currentUserResource.isLoading()) {
    // 2. Si c'est en cours de chargement, créer une promesse qui attend que isLoading devienne false.
    await new Promise<void>((resolve) => {
      // Créer un effect qui s'exécute lorsque isLoading change.
      const effectRef = effect(() => {
        if (!authService.currentUserResource.isLoading()) {
          // Lire la valeur du signal à l'intérieur de l'effect
          resolve(); // Résoudre la promesse une fois que le chargement est terminé
          effectRef.destroy(); // Très important : détruire l'effect pour éviter les fuites de mémoire
        }
      });
    });
  }

  // 3. À ce stade, isLoading est false (soit il l'était initialement, soit la promesse s'est résolue).
  //    On peut maintenant vérifier l'état de connexion.
  const isLoggedIn = authService.isLoggedin();

  if (!isLoggedIn) {
    router.navigateByUrl('/signin');
    return false;
  }

  return true;
};
