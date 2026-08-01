const { CityService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createCity(req, res) {
    try {
        const city = await CityService.createCity({ name: req.body.name });
        return res.status(StatusCodes.CREATED).json(SuccessResponse(city));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

async function deleteCity(req, res) {
    try {
        const response = await CityService.deleteCity(req.params.id);
        return res.status(StatusCodes.OK).json(SuccessResponse(response));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

async function updateCity(req, res) {
    try {
        const city = await CityService.updateCity(req.params.id, req.body);
        return res.status(StatusCodes.OK).json(SuccessResponse(city));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

module.exports = {
    createCity,
    deleteCity,
    updateCity
};