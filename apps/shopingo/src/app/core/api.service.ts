import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { End_Points } from './http/global/global.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = End_Points.products; // Your backend URL

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl.getAll);
  }
  
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl.getById(id));
  }
}
