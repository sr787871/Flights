const ErrorResponse = (error = {}, message = "Something went wrong") => ({
    success: false,
    message,
    data: {},
    error: error.explanation ? { explanation: error.explanation } : error
});

module.exports = ErrorResponse;