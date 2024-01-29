import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../models/credentials';
import { environment } from 'src/environments/environment'
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl + '/users'

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  autenticar(creds: Credenciais): Observable<string> {
    return this.http.post(`${this.baseUrl}/auth`, creds, {
      responseType: 'text',
    }).pipe(
      map((token: string) => {
        console.log('Token recebido:', token);
        return token || '';
      })
    );
  }

  successfulLogin(authToken: string) {
    localStorage.setItem("token", authToken);
  }

  isAuteticado() {
    let token = localStorage.getItem("token");
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }
}
