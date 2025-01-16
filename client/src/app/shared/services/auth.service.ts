import { computed, Injectable, resource, signal } from '@angular/core';
import { SigninForm, User } from '../interfaces';

const API_AUTH = '/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserResource = resource({
    loader: () => this.fetchCurrentUser(),
  });
  isLoggedin = computed(() => {
    const value = this.currentUserResource.value();
    if (value !== undefined) {
      return !!value;
    } else {
      return undefined;
    }
  });
  currentUser = computed(() => this.currentUserResource.value());

  async signin(signinForm: SigninForm): Promise<User> {
    const response = await fetch(API_AUTH, {
      method: 'POST',
      body: JSON.stringify(signinForm),
      headers: {
        'Content-type': 'application/json',
      },
    });
    console.log(response);
    const body = await response.json();
    if (response.ok) {
      this.currentUserResource.reload();
      return body as User;
    } else {
      throw new Error(body);
    }
  }

  async fetchCurrentUser() {
    return (await fetch(`${API_AUTH}/current`)).json();
  }
}
