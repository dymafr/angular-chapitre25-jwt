import { Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { SignupComponent } from './views/signup/signup.component';
import { SigninComponent } from './views/signin/signin.component';
import { NotfoundComponent } from './views/not-found/not-found.component';
import { ProfileComponent } from './views/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
