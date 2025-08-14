import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { End_Points } from './http/global/global.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = End_Points.auth;

  login(credentials: any) {
    return this.http.post<any>(this.apiUrl.login, credentials).pipe(
      tap(response => {
        // Store the token upon successful login
        localStorage.setItem('token', response.token);
      })
    );
  }
}
