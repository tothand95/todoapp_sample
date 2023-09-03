import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

/**
 * For every HttpResponse it handles the HTTP Error
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        catchError(
          (response: HttpErrorResponse) => {
            this.handleErrorResponse(response);

            // throw the error through to be available for the components
            return throwError(() => response);
          }
        )
      );
  }

  private handleErrorResponse(response: HttpErrorResponse) {
    console.log(response);
  }
}
