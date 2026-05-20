import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/users`).pipe(
      map((users) => {
        const user = users.find(
          (x) => x.email === email && x.password === password,
        );

        if (user) {
          localStorage.setItem('token', 'fake-jwt-token');
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }),
    );
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getRole() {
    return JSON.parse(localStorage.getItem('user') || '{}').role;
  }
  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }
}
