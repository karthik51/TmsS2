export class AppError {
    originalError: any;
    status: any;

    constructor(originalError?: any, status?: any) {
        this.originalError = originalError;
        this.status = status;
    }
}