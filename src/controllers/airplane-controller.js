const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

// Post : /airplane
// reqbody {modelNumber:'airbus320', capacity:200}
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res.status(StatusCodes.CREATED).json(SuccessResponse(airplane));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

// GET : /airplanes
async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        return res.status(StatusCodes.OK).json(SuccessResponse(airplanes));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

// GET : /airplanes/:id
async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        return res.status(StatusCodes.OK).json(SuccessResponse(airplane));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

// DELETE : /airplanes/:id
async function destroyAirplane(req, res) {
    try {
        const response = await AirplaneService.destroyAirplane(req.params.id);
        return res.status(StatusCodes.OK).json(SuccessResponse(response));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

// PATCH : /airplanes/:id
async function updateAirplane(req, res) {
    try {
        const updatedAirplane = await AirplaneService.updateAirplane(req.params.id, req.body);
        return res.status(StatusCodes.OK).json(SuccessResponse(updatedAirplane));
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
};