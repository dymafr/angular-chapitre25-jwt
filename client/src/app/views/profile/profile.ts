import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [JsonPipe],
  template: `
    <div class="card">
      <pre>{{ currentUser() | json }}</pre>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 auto;
    }
    .card {
      background-color: white;
      min-width: 500px;
    }
  `,
})
export class Profile {
  readonly authService = inject(AuthService);
  currentUser = this.authService.currentUser;
}
