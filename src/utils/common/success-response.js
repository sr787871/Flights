const SuccessResponse = (data = {}, message = "Successfully completed the request") => ({
    success: true,
    message,
    data,
    error: {}
});

module.exports = SuccessResponse;