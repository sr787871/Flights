export class AppError extends Error {
    public statusCode: number;
    public explanation?: string;

    constructor(message: string, statusCode: number, explanation?: string) {
        super(message);
        this.statusCode = statusCode;
        this.explanation = explanation || message;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
