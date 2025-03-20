const express = require("express");
const {AirplaneController} = require("../../controllers");
const {AirplaneMiddlewares } = require("../../middlewares");
const airplaneRoutes = express.Router();

// api/v1/airplanes POST
airplaneRoutes.post('/',
    AirplaneMiddlewares.validateCreateRequest,  // Adding middlewares for validation
    AirplaneController.createAirplane
);

// api/v1/airplanes GET
airplaneRoutes.get('/',
    AirplaneController.getAirplanes
);

// api/v1/airplanes GET
airplaneRoutes.get('/:id',
    AirplaneController.getAirplane
);
module.exports = airplaneRoutes;