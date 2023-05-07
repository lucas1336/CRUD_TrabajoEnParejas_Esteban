import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Offers } from '../models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  base_Url = 'http://localhost:3000/offers';

  constructor(private http: HttpClient) {}

  //http options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //http API Errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  createItem(item: any): Observable<Offers> {
    return this.http
      .post<Offers>(this.base_Url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getList(): Observable<Offers> {
    return this.http
      .get<Offers>(this.base_Url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getItem(id: string): Observable<Offers> {
    return this.http
      .get<Offers>(this.base_Url + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateItem(id: string, item: any): Observable<Offers> {
    return this.http
      .put<Offers>(
        this.base_Url + '/' + id,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id: string): Observable<Offers> {
    return this.http
      .delete<Offers>(`${this.base_Url}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
