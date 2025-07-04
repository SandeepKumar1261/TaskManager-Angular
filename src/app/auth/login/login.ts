import { Component } from '@angular/core';
import { UserService } from '../../core/service/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formData = { email: '', password: '' };
  errors = { email: '', password: '' };
  apiError: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.formData[target.name as keyof typeof this.formData] = target.value;
    this.errors[target.name as keyof typeof this.errors] = '';
    this.apiError = null;
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const { email, password } = this.formData;

    this.userService.login(email, password).subscribe((data) => {
      if (data) {
        console.log(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('User', data.user.email);
        this.router.navigate(['/']);
      } else {
        this.apiError = 'Invalid email or password';
      }
    });
  }
}
