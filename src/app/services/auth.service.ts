import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'; // Para decodificar o token JWT

// Interface para representar o usuário (adapte de acordo com sua API)
interface User {
  id: string;
  username: string;
  // ... outras propriedades do usuário
}

// Interface para representar a resposta da API de login
interface LoginResponse {
  token: string;
  // ... outras propriedades da resposta, se houver
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl; 
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    // Verifica se há um token armazenado ao inicializar o serviço
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const user = this.decodeToken(token);
      this.currentUserSubject.next(user);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        const token = response.token;
        localStorage.setItem('token', token);
        const user = this.decodeToken(token);
        this.currentUserSubject.next(user);
      }),
      catchError(error => {
        console.error('Erro no login:', error);
        return throwError(() => new Error('Credenciais inválidas'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  register(username: string, email: string, password: string): Observable<any> { // Ajuste o tipo de retorno conforme a resposta da sua API
    return this.http.post(`${this.apiUrl}/auth/register`, { username, email, password }).pipe(
      tap(response => {
        // Lógica para lidar com a resposta de sucesso do registro (opcional)
        console.log('Registro bem-sucedido:', response);
      }),
      catchError(error => {
        console.error('Erro no registro:', error);
        return throwError(() => new Error('Erro ao registrar usuário.')); // Personalize a mensagem de erro
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!(token && !this.jwtHelper.isTokenExpired(token));
  }

  private decodeToken(token: string): User | null {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken as User; 
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
}
