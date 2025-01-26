import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, timestamp } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string, captcha: string) {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + '/login', { username, password, captcha })
      .pipe(
        tap((value) => {
          // Convertendo timestamp para objeto Date
          value.timestamp = new Date(value.timestamp);

          // Desestruturando os valores da resposta
          const { message, data, timestamp } = value;

          // Exibindo os valores no console separadamente
          console.log('Message:', message);
          console.log('Data:', data);
          console.log('Timestamp:', timestamp);

          sessionStorage.setItem('auth-token', value.data);
        })
      );
  }

  signup(username: string, email: string, password: string) {
    const role = 'USER'
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + '/register', { username, email, password, role });
  }

  logout(): void {
    // Remova o token armazenado (seja no localStorage ou sessionStorage)
    localStorage.removeItem('auth-token');
    console.log('Usuário deslogado.');
  }

  isAuthenticated(): boolean {
    // Verifica se o token está armazenado
    const token = sessionStorage.getItem('auth-token');
    return !!token;
  }
}
