import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  baseUrl: string = environment.apiUrl;

  constructor(protected http: HttpClient, private storageService: StorageService) {}

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  get(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }

  create(endpoint: string, item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, item, { headers: this.getHeaders() });
  }

  update(endpoint: string, id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, item, { headers: this.getHeaders() });
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }
}