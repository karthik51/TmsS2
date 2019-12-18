import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { BadRequestError } from './bad-request-error';
import { UnauthorizedError } from './unauthorized-error';
//import { AlertifyService } from '../../_services/alertify.service';
import { NotFoundError } from './not-found-error';
import { InternalServerError } from './internal-server-error';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error: any) {
    let alertify = this.injector.get(AlertifyService);

    if (error.originalError) {
      const message = error.originalError;

      if (error instanceof BadRequestError) {        
        alertify.error(message.ModelState ? this.parseError(message.ModelState) : `400: ${error.originalError}`);
      } else if (error instanceof UnauthorizedError) {
        alertify.error('401: Authorization has been denied for this request!');
      } else if (error instanceof NotFoundError) {
        alertify.error('404: The resource you are looking for could not be found!');
      } else if (error instanceof InternalServerError) {
        if (!environment.production) {
          console.log({ serverError: message });
          alertify.error('500: Internal Server Error: Check console for more details.');
        } else {
          alertify.error(`500: ${this.parseError(message)}`);
        }
      }
    } else {
      console.log(error);
    }
  }

  private parseError(modelStateError: any): string {
    let modelStateErrorMessage: string = '';

    for (const key in modelStateError) {
      if (modelStateError[key]) {
        modelStateErrorMessage += modelStateError[key] + '\n';
      }
    }

    return modelStateErrorMessage;
  }
}