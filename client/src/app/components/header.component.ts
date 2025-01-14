import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="flex-auto">
      <a routerLink="/"> <strong>JWT</strong> </a>
    </div>
    <ul class="flex gap-12">
      <li>
        <a routerLink="/signup" routerLinkActive="text-primary">Inscription</a>
      </li>
      <li>
        <a routerLink="/signin" routerLinkActive="text-primary">Connexion</a>
      </li>
      <!-- <li>
        <a routerLink="/profile" routerLinkActive="text-primary">Profil</a>
      </li>
      <li>
        <a routerLink="/logout" routerLinkActive="text-primary">Deconnexion</a>
      </li> -->
    </ul>
  `,
  styles: `:host { background-color: white; padding: 12px; }`,
})
export class HeaderComponent {}
