import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private http: HttpClient) {}

  signin(user: Object): Observable<Object> {
    return this.http.post<Object>(`http://localhost:3000/user/signin`, user);
  }

  signup(user: Object): Observable<Object> {
    return this.http.post(`http://localhost:3000/user/signup`, user);
  }
}
