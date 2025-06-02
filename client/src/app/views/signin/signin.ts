import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SigninForm } from '../../shared/interfaces';
import { Router } from '@angular/router';
import { AuthDataClient } from '../../shared/services/auth.data-client';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="signinForm" (submit)="submit()" class="card">
      <h2 class="mb-20">Connexion</h2>
      <div class="flex flex-col mb-20">
        <label for="email">Email</label>
        <input formControlName="email" type="text" id="email" />
        @if (emailControl.errors?.['required'] && (emailControl.touched ||
        formSubmitted())) {
        <p class="error">Email obligatoire</p>
        } @else if (emailControl.errors?.['email'] && (emailControl.touched ||
        formSubmitted())) {
        <p class="error">Email non valide</p>
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
      <div class="mb-20">
        @if (signinForm.errors?.['general']) {
        <p class="error">Mot de passe ou email incorrect</p>
        }
      </div>
      <div>
        <button class="btn btn-primary">Connexion</button>
      </div>
    </form>
  `,
  styles: `:host { display: flex; align-items:center; justify-content: center; flex: 1 1 auto; }
    .card { background-color:white; min-width: 500px; }
  `,
})
export class Signin {
  readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthDataClient);
  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  readonly router = inject(Router);
  formSubmitted = signal(false);
  get emailControl() {
    return this.signinForm.get('email') as FormControl;
  }
  get passwordControl() {
    return this.signinForm.get('password') as FormControl;
  }
  async submit() {
    this.formSubmitted.set(true);
    if (this.signinForm.valid) {
      const signinForm = this.signinForm.getRawValue() as SigninForm;
      try {
        const user = await this.authService.signin(signinForm);
        this.router.navigateByUrl('/');
      } catch (e: any) {
        console.log(e);
        this.signinForm.setErrors({ general: true });
      }
    }
  }
}
