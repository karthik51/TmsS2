import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BadRequestError } from './error-handlers/bad-request-error';
import { InternalServerError } from './error-handlers/internal-server-error';
import { NotFoundError } from './error-handlers/not-found-error';
import { UnauthorizedError } from './error-handlers/unauthorized-error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case HttpStatusCode.Unauthorized:
                            return throwError(new UnauthorizedError(error.error, error.status));
                        case HttpStatusCode.BadRequest:                            
                            const serverError = error.error;
                            if (typeof serverError === 'object') {
                                let modelStateError = this.parseModelStateError(serverError);

                                if (serverError.error === 'invalid_grant') {
                                    return throwError(new UnauthorizedError(modelStateError, error.status));
                                }
                                else {
                                    return throwError(new BadRequestError(modelStateError, error.status));
                                }
                            }

                            return throwError(new BadRequestError(serverError, error.status));
                        case HttpStatusCode.NotFound:
                            return throwError(new NotFoundError(error.error, error.status));
                        case HttpStatusCode.InternalServerError:
                            return throwError(new InternalServerError(error.error, error.status));
                        default:
                            return throwError('Unknown Http Error Response');
                    }
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private parseModelStateError(error: any): string {
        let modelStateErrorMessage: string = '';

        const errorObject = error.ModelState ? error.ModelState : error;

        if (error.error && error.error === 'invalid_grant') {
            modelStateErrorMessage = error.error_description;
        } else {
            for (const key in errorObject) {
                if (errorObject[key]) {
                    modelStateErrorMessage += errorObject[key] + '\n';
                }
            }
        }

        return modelStateErrorMessage;
    }
}

enum HttpStatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};