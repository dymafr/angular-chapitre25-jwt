import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthDataClient } from '../../shared/services/auth.data-client';

@Component({
  selector: 'app-profile',
  imports: [JsonPipe],
  template: `
    <div class="card">
      <pre>{{ currentUser() | json }}</pre>
    </div>
  `,
  styles: `:host { display: flex; align-items:center; justify-content: center; flex: 1 1 auto; }
   .card { background-color:white; min-width: 500px; }
 `,
})
export class Profile {
  readonly authService = inject(AuthDataClient);
  currentUser = this.authService.currentUser;
}
