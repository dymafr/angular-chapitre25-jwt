import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthDataClient } from '../shared/services/auth.data-client';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="flex-auto">
      <a routerLink="/"> <strong>JWT</strong> </a>
    </div>
    <ul class="flex gap-12">
      @if (isLoggedin()) {
      <li>
        <a routerLink="/profile" routerLinkActive="text-primary">Profil</a>
      </li>
      <li>
        <span (click)="logout()" class="logout">Déconnexion</span>
      </li>
      } @else if (isLoggedin() === false) {
      <li>
        <a routerLink="/signup" routerLinkActive="text-primary">Inscription</a>
      </li>
      <li>
        <a routerLink="/signin" routerLinkActive="text-primary">Connexion</a>
      </li>
      }
    </ul>
  `,
  styles: `:host { background-color: white; padding: 12px; } .logout { cursor: pointer; }`,
})
export class Header {
  readonly authService = inject(AuthDataClient);
  isLoggedin = this.authService.isLoggedin;

  public logout() {
    this.authService.logout();
  }
}
