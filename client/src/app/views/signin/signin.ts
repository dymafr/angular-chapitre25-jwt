import { Component, inject, signal } from '@angular/core';
import {
  FormRoot,
  FormField,
  form,
  required,
  email,
} from '@angular/forms/signals';
import { Router } from '@angular/router';
import { SigninForm } from 'app/shared/interfaces';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
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
    <form [formRoot]="authForm" class="card">
      <h2 class="mb-20">Connexion</h2>
      <div class="flex flex-col mb-20">
        <label for="email">Email</label>
        <input [formField]="authForm.email" type="text" id="email" />
        @let email = authForm.email();
        @if (email.touched()) {
          @for (error of email.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <div class="flex flex-col mb-20">
        <label for="password">Mot de passe</label>
        <input [formField]="authForm.password" type="password" id="password" />
        @let password = authForm.password();
        @if (password.touched()) {
          @for (error of password.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <button class="btn btn-primary">Connexion</button>
    </form>
  `,
  imports: [FormRoot, FormField],
})
export class Signin {
  private authService = inject(AuthService);
  private router = inject(Router);

  authModel = signal<SigninForm>({
    email: '',
    password: '',
  });

  authForm = form(
    this.authModel,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email obligatoire' });
      required(schemaPath.password, { message: 'Mot de passe obligatoire' });
      email(schemaPath.email, { message: "l'email n'est pas valide" });
    },
    {
      submission: {
        action: async (field) => {
          const authFormValue = field().value();
          try {
            const user = await this.authService.signin(authFormValue);
            this.router.navigateByUrl('/');
            return;
          } catch (e: any) {
            console.log(e);
            return;
          }
        },
      },
    },
  );
}
