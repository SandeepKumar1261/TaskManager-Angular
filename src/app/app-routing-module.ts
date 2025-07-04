import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Todos } from './todo/todos/todos';
import { AddTask } from './todo/add-task/add-task';
import { authGuard } from './core/guard/auth-guard-guard';
import { guestGuardGuard } from './core/guard/guest-guard-guard';

const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuardGuard],
  },
  {
    path: 'addtask',
    component: AddTask,
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    component: Signup,
    canActivate: [guestGuardGuard],
  },
  {
    path: '',
    component: Todos,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
