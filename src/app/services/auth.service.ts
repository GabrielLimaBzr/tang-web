import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../models/credentials';
import { environment } from 'src/environments/environment'
import { Observable, catchError, map, throwError } from 'rxjs';
import { RegisterUser } from '../models/registerUser';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = environment.baseUrl + '/users'
  jwtService: JwtHelperService = new JwtHelperService();
  private loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  autenticar(creds: Credenciais): Observable<string> {
    const url = `${this.baseUrl}/auth`;
    return this.http.post(url, creds, {
      responseType: 'text',
    }).pipe(
      map((token: string) => {;
        return token || '';
      })
    );
  }

  successfulLogin(authToken: string): void {
    if (!this.jwtService.isTokenExpired(authToken)) {
      localStorage.setItem('token', authToken);
      this.loginStatus.emit(true); // Emitir evento de status de login
    } else {
      console.error('Token expirado.');
    }
  }

  isAutenticado(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtService.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loginStatus.emit(false);
  }

  getLoginStatus(): EventEmitter<boolean> {
    return this.loginStatus;
  }

  register(create: RegisterUser): Observable<RegisterUser> {
    const url = `${this.baseUrl}/create`;
    return this.http.post<RegisterUser>(url, create);
  }
}
