export const SuccessResponse = (data: any = {}, message: string = "Successfully completed the request") => ({
    success: true,
    message,
    data,
    error: {}
});
