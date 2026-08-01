export const ErrorResponse = (error: any = {}, message: string = "Something went wrong") => ({
    success: false,
    message,
    data: {},
    error: error.explanation ? { explanation: error.explanation } : error
});
