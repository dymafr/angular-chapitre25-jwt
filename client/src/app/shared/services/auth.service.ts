import { Service } from '@angular/core';
import { SigninForm, User } from '../interfaces';

export const API_AUTH = '/api/auth';

@Service()
export class AuthService {
  async signin(signinForm: SigninForm): Promise<User> {
    const response = await fetch(API_AUTH, {
      method: 'POST',
      body: JSON.stringify(signinForm),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body);
    }
    return body as User;
  }
}
