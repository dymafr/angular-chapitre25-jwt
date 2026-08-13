import { Injectable } from '@angular/core';
import { User, UserForm } from '../interfaces';

export const API_USERS = '/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async createUser(userForm: UserForm): Promise<User> {
    const response = await fetch(API_USERS, {
      method: 'POST',
      body: JSON.stringify(userForm),
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
