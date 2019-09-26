import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiErrorService {
  handleError(err: HttpErrorResponse): Observable<any> {
    if (err.error instanceof Error) {
      return this.handleClientSideError(err);
    } else {
      return this.handleBackendError(err);
    }
  }

  private handleClientSideError(err: Error): Observable<any> {
    console.error('A client side error occurred:', err.message);
    return Observable.throw(err.message || err);
  }

  private handleBackendError(err: HttpErrorResponse): Observable<any> {
    console.error(
      `Backend returned code ${err.status}, body was ${err.message}`,
    );
    return Observable.throw(err.message || err);
  }
}
