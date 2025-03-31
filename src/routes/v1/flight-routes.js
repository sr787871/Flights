const express = require("express");
const {FlightController} = require("../../controllers");
const {FlightMiddlewares} = require("../../middlewares");
const flightRoutes = express.Router();

// api/v1/airplanes POST
flightRoutes.post('/',
    FlightMiddlewares.validateCreateRequest,  // Adding middlewares for validation
    FlightController.createFlight
);

// api/v1/airplanes POST
flightRoutes.get('/',
    // FlightMiddlewares.validateCreateRequest,  // Adding middlewares for validation
    FlightController.getAllFlights
);

module.exports = flightRoutes;