import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalConstants } from '../global-constants';
import { ErrorHandler } from '../_helpers/errorhandler';
import { User } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${GlobalConstants.ApiBaseUrl}/login`;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User | null>(
      localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')||'{}') : null
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.loginUrl, { username: username, password: password }, this.httpOptions)
      .pipe(
        map((data: any) => {
          localStorage.setItem('user', JSON.stringify(data.user));
          this.userSubject.next(data.user);
          return data.user;
        }),
        catchError(this.errorHandler.handleError<User>('login'))
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
