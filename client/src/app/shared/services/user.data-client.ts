import { Injectable } from '@angular/core';
import { User, UserForm } from '../interfaces';

const API_USERS = '/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserDataClient {
  async createUser(user: UserForm): Promise<User> {
    const response = await fetch(API_USERS, {
      method: 'POST',
      body: JSON.stringify(user),
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
