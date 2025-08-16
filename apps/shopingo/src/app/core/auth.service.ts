import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { End_Points } from './http/global/global.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = End_Points.auth;

  currentUser = signal<any | null | undefined>(undefined);
  isLoggedIn = computed(() => !!this.currentUser());


  constructor() {
    // Check for a token in localStorage when the service is initialized
    const token = localStorage.getItem('token');
    if (token) {
      // For simplicity, we assume the token is valid. In a real app, you'd verify it.
      // You'd typically decode the token to get user info.
      // For now, we'll just set a placeholder since we don't have user info in the token yet.
      // We will fix this in a later step.
      this.currentUser.set({ token });
    } else {
      this.currentUser.set(null);
    }
  }

  login(credentials: any) {
    return this.http.post<any>(this.apiUrl.login, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUser.set(response);
      })
    );
  }

  register(userInfo: any) {
    return this.http.post<any>(this.apiUrl.register, userInfo);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
