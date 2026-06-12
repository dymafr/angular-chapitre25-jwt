import { Routes } from '@angular/router';
import { Homepage } from './views/homepage/homepage';
import { Signup } from './views/signup/signup';
import { Signin } from './views/signin/signin';
import { NotfoundComponent } from './views/not-found/not-found';
import { Profile } from './views/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Homepage,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'signin',
    component: Signin,
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
