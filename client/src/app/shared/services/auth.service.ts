import { Injectable } from '@angular/core';
import { SigninForm, User } from '../interfaces';

const API_AUTH = '/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async signin(signinForm: SigninForm): Promise<User> {
    const response = await fetch(API_AUTH, {
      method: 'POST',
      body: JSON.stringify(signinForm),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.ok) {
      return body as User;
    } else {
      throw new Error(body);
    }
  }
}
