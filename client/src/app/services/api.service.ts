import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
}
