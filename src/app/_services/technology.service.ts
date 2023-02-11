import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Technology } from '../_models';
import { GlobalConstants } from '../global-constants';
import { ErrorHandler } from '../_helpers/errorhandler';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  private technologyUrl = `${GlobalConstants.ApiBaseUrl}/technologies`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {}

  getTechnologies(): Observable<Technology[]> {
    return this.http
      .get<Technology[]>(this.technologyUrl)
      .pipe(catchError(this.errorHandler.handleError<Technology[]>('getTechnologies', [])));
  }

  getTechnology(id: number): Observable<Technology> {
    const url = `${this.technologyUrl}/${id}`;
    return this.http
      .get<Technology>(url)
      .pipe(catchError(this.errorHandler.handleError<Technology>(`getTechnology id=${id}`)));
  }

  addTechnology(technology: Technology): Observable<Technology> {
    return this.http
      .post<Technology>(this.technologyUrl, technology, this.httpOptions)
      .pipe(catchError(this.errorHandler.handleError<Technology>('addTechnology')));
  }
}
