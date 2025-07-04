import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Signup } from './signup/signup';
import { Router, RouterLink, RouterModule } from '@angular/router';

@NgModule({
  declarations: [Login, Signup],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [Login, Signup],
})
export class AuthModule {}
