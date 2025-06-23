import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    username: '',
    password: ''
  };

  isLoginFailed = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login({ username, password }).subscribe({
      next: (res) => {
        this.tokenService.saveToken(res.token);
        this.tokenService.saveUsername(res.username);
        this.isLoginFailed = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoginFailed = true;
      }
    });
  }
}
