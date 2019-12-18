import { AppError } from "./app-error";

export class UnauthorizedError extends AppError {
    constructor(error?: any, status?: any)  {        
        super(error, status);
    }
}