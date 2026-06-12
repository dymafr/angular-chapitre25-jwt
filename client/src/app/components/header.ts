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
      <!-- <li>
        <a routerLink="/profile" routerLinkActive="text-primary">Profil</a>
      </li>
      <li>
        <span class="logout">Déconnexion</span>
      </li> -->
      <li>
        <a routerLink="/signup" routerLinkActive="text-primary">Inscription</a>
      </li>
      <li>
        <a routerLink="/signin" routerLinkActive="text-primary">Connexion</a>
      </li>
    </ul>
  `,
  styles: `
    :host {
      background-color: white;
      padding: 12px;
    }
    .logout {
      cursor: pointer;
    }
  `,
})
export class Header {}
