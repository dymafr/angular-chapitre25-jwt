import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { UserForm } from '../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (submit)="submit()" class="card">
      <h2 class="mb-20">Inscription</h2>
      <div class="flex flex-col mb-20">
        <label for="email">Email</label>
        <input formControlName="email" type="text" id="email" />
        @if (emailControl.errors?.['required'] && (emailControl.touched ||
        formSubmitted())) {
        <p class="error">Email obligatoire</p>
        } @else if (emailControl.errors?.['email'] && (emailControl.touched ||
        formSubmitted())) {
        <p class="error">Email non valide</p>
        } @else if (emailControl.errors?.['emailAlreadyUsed']) {
        <p class="error">Adresse email déjà utilisée</p>
        }
      </div>
      <div class="flex flex-col mb-20">
        <label for="username">Nom d'utilisateur</label>
        <input formControlName="username" type="text" id="username" />
        @if (usernameControl.errors?.['required'] && (usernameControl.touched ||
        formSubmitted())) {
        <p class="error">Nom d'utilisateur obligatoire</p>
        } @else if (usernameControl.errors?.['minLength'] &&
        (usernameControl.touched || formSubmitted())) {
        <p class="error">Nom d'utilisateur trop court</p>
        }
      </div>
      <div class="flex flex-col mb-20">
        <label for="password">Mot de passe</label>
        <input formControlName="password" type="password" id="password" />
        @if (passwordControl.errors?.['required'] && (passwordControl.touched ||
        formSubmitted() )) {
        <p class="error">Mot de passe obligatoire</p>
        } @else if (passwordControl.errors?.['minLength'] &&
        (passwordControl.touched || formSubmitted())) {
        <p class="error">Mot de passe trop court</p>
        }
      </div>
      <div>
        <button class="btn btn-primary">Sauvegarder</button>
      </div>
    </form>
  `,
  styles: `:host { display: flex; align-items:center; justify-content: center; flex: 1 1 auto; }
    .card { background-color:white; min-width: 500px; }
  `,
})
export class SignupComponent {
  readonly fb = inject(FormBuilder);
  readonly userService = inject(UserService);
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  readonly router = inject(Router);
  formSubmitted = signal(false);
  get emailControl() {
    return this.userForm.get('email') as FormControl;
  }
  get usernameControl() {
    return this.userForm.get('username') as FormControl;
  }
  get passwordControl() {
    return this.userForm.get('password') as FormControl;
  }
  async submit() {
    this.formSubmitted.set(true);
    if (this.userForm.valid) {
      const userForm = this.userForm.getRawValue() as UserForm;
      try {
        const user = await this.userService.createUser(userForm);
        this.router.navigateByUrl('/signin');
      } catch (e: any) {
        console.log(e);
        if (e.message === 'adresse email déjà utilisée') {
          this.emailControl.setErrors({ emailAlreadyUsed: true });
        }
      }
    }
  }
}
