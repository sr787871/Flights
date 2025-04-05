const express = require("express");
const {FlightController} = require("../../controllers");
const {FlightMiddlewares} = require("../../middlewares");
const flightRoutes = express.Router();

// api/v1/flights POST
flightRoutes.post('/',
    FlightMiddlewares.validateCreateRequest,  // Adding middlewares for validation
    FlightController.createFlight
);

// api/v1/flights GET
flightRoutes.get('/',
    // FlightMiddlewares.validateCreateRequest,  // Adding middlewares for validation
    FlightController.getAllFlights
);

// api/v1/flights/:id GET
flightRoutes.get('/:id',
    // FlightMiddlewares.validateCreateRequest,  // Adding middlewares for validation
    FlightController.getFlight
);

// api/v1/flights/:id PATCH
flightRoutes.patch('/:id/seats',
    // FlightMiddlewares.validateCreateRequest,  // Adding middlewares for validation
    FlightMiddlewares.validateUpdateSeatsRequest,
    FlightController.updateSeats
);

module.exports = flightRoutes;