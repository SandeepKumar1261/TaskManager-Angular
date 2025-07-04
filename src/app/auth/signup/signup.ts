import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../core/service/todo';
import { UserService } from '../../core/service/user-service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMsg: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onSignup() {
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match!';
      return;
    }

    if (this.password.length < 6) {
      this.errorMsg = 'Password must be at least 6 characters!';
      return;
    }
    this.userService
      .signup(this.email, this.password)
      .subscribe((data: any) => {});
    this.errorMsg = '';
    this.router.navigate(['/login']);
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
