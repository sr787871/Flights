const express = require("express");
const {AirportController} = require("../../controllers");
const {AirportMiddlewares } = require("../../middlewares");
const airportRoutes = express.Router();

// api/v1/airports POST
airportRoutes.post('/',
    AirportMiddlewares.validateCreateRequest,  // Adding middlewares for validation
    AirportController.createAirport
);

// api/v1/airports GET
airportRoutes.get('/',
    AirportController.getAirports
);

// api/v1/airports/:id GET
airportRoutes.get('/:id',
    AirportController.getAirport
);

// api/v1/airports/:id DELETE
airportRoutes.delete('/:id',
    AirportController.destroyAirport
);

// api/v1/airports/:id PATCH
airportRoutes.patch('/:id',
    AirportMiddlewares.validateCreateRequest,
    AirportController.updateAirport
)

module.exports = airportRoutes;