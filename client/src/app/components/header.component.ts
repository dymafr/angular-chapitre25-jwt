import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

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
        <a routerLink="/logout" routerLinkActive="text-primary">Déconnexion</a>
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
  styles: `:host { background-color: white; padding: 12px; }`,
})
export class HeaderComponent {
  readonly authService = inject(AuthService);
  isLoggedin = this.authService.isLoggedin;

  constructor() {
    effect(() => {
      console.log(this.isLoggedin());
    });
  }
}
