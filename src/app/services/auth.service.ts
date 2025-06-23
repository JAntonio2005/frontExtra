import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//const API_URL = 'http://localhost:8080/api/auth'; // cámbialo si usas Render
  const API_URL = 'https://extraback.onrender.com/api/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${API_URL}/login`, credentials);
  }

  register(data: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${API_URL}/register`, data);
  }


  
}
