const { AirportService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

// Post : /airports
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            cityId: req.body.cityId,
            address: req.body.address
        });
        return res.status(StatusCodes.CREATED).json(SuccessResponse(airport));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

// GET : /airports
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        return res.status(StatusCodes.OK).json(SuccessResponse(airports));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

// GET : /airports/:id
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        return res.status(StatusCodes.OK).json(SuccessResponse(airport));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

// DELETE : /airports/:id
async function destroyAirport(req, res) {
    try {
        const response = await AirportService.destroyAirport(req.params.id);
        return res.status(StatusCodes.OK).json(SuccessResponse(response));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

// PATCH : /airports/:id
async function updateAirport(req, res) {
    try {
        const updatedAirport = await AirportService.updateAirport(req.params.id, req.body);
        return res.status(StatusCodes.OK).json(SuccessResponse(updatedAirport));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
};