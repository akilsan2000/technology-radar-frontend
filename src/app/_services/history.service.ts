import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from '../global-constants';
import { ErrorHandler } from '../_helpers';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private technologyUrl = `${GlobalConstants.ApiBaseUrl}/technologies`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {}

  getHistory(): Observable<[]> {
    const url = `${GlobalConstants.ApiBaseUrl}/loginhistory`;
    return this.http
      .get<[]>(url)
      .pipe(catchError(this.errorHandler.handleError<[]>(`getHistory`)));
  }
}
