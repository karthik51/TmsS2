import { AppError } from "./app-error";

export class InternalServerError extends AppError {
    constructor(error?: any, status?: any)  {        
        super(error, status);
    }
}