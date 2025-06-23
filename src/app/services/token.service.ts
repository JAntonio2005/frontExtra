import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'auth-token';
  private userKey = 'auth-user';

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

getToken(): string | null {
  return localStorage.getItem('auth-token');
}

  saveUsername(username: string): void {
    localStorage.setItem(this.userKey, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.userKey);
  }

  logout(): void {
    localStorage.clear();
  }
}
