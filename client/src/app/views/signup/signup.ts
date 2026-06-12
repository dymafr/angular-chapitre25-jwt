import { Component, inject, signal } from '@angular/core';
import {
  email,
  form,
  required,
  FormRoot,
  FormField,
} from '@angular/forms/signals';
import { Router } from '@angular/router';
import { UserForm } from 'app/shared/interfaces';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-signup',
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
  template: `
    <form [formRoot]="userForm" class="card">
      <h2 class="mb-20">Inscription</h2>
      <div class="flex flex-col mb-20">
        <label for="email">Email</label>
        <input [formField]="userForm.email" type="text" id="email" />
        @let email = userForm.email();
        @if (email.touched()) {
          @for (error of email.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <div class="flex flex-col mb-20">
        <label for="username">Nom d'utilisateur</label>
        <input [formField]="userForm.username" type="text" id="username" />
        @let username = userForm.username();
        @if (username.touched()) {
          @for (error of username.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <div class="flex flex-col mb-20">
        <label for="password">Mot de passe</label>
        <input [formField]="userForm.password" type="password" id="password" />
        @let password = userForm.password();
        @if (password.touched()) {
          @for (error of password.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <button class="btn btn-primary">Sauvegarder</button>
    </form>
  `,
  imports: [FormRoot, FormField],
})
export class Signup {
  private userService = inject(UserService);
  private router = inject(Router);

  userModel = signal<UserForm>({
    email: '',
    password: '',
    username: '',
  });

  userForm = form(
    this.userModel,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email obligatoire' });
      required(schemaPath.password, { message: 'Mot de passe obligatoire' });
      required(schemaPath.username, {
        message: "Nom d'utilisateur obligatoire",
      });
      email(schemaPath.email, { message: "l'email n'est pas valide" });
    },
    {
      submission: {
        action: async (field) => {
          const userFormValue = field().value();
          try {
            const user = await this.userService.createUser(userFormValue);
            this.router.navigateByUrl('/signin');
            return;
          } catch (e: any) {
            if (e.message === 'adresse email déjà utilisée') {
              return {
                kind: 'emailAlreadyUsed',
                message: 'Email déjà utilisée',
                fieldTree: field.email,
              };
            }
            console.log(e);
            return;
          }
        },
      },
    },
  );
}
