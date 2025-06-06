import { computed, inject, Injectable, resource } from '@angular/core';
import { SigninForm, User } from '../interfaces';
import { Router } from '@angular/router';
import { httpResource } from '@angular/common/http';

const API_AUTH = '/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthDataClient {
  // currentUserResource = resource({
  //   loader: () => this.fetchCurrentUser(),
  // });

  // Depuis Angular 20, on peut utiliser httpResource
  currentUserResource = httpResource<User | null>(() => ({
    url: `${API_AUTH}/current`,
    defaultValue: null,
  }));

  isLoggedin = computed(() => {
    const value = this.currentUserResource.value();
    if (value !== undefined) {
      return !!value;
    } else {
      return undefined;
    }
  });
  currentUser = computed(() => this.currentUserResource.value());
  readonly router = inject(Router);

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

  // async fetchCurrentUser() {
  //   return (await fetch(`${API_AUTH}/current`)).json();
  // }

  async logout() {
    await fetch(API_AUTH, {
      method: 'DELETE',
    });
    this.currentUserResource.reload();
    this.router.navigateByUrl('/');
  }
}
