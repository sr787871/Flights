const express = require("express");
const {FlightController} = require("../../controllers");
const {FlightMiddlewares} = require("../../middlewares");
const airplaneRoutes = express.Router();

// api/v1/airplanes POST
airplaneRoutes.post('/',
    FlightMiddlewares.validateCreateRequest,  // Adding middlewares for validation
    FlightController.createFlight
);


module.exports = airplaneRoutes;