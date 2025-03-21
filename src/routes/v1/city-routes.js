const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");
const cityRoutes = express.Router();

// api/v1/cities POST
cityRoutes.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity
);

// api/v1/cities PATCH
cityRoutes.patch('/:id',
    CityController.updateCity
);

// api/v1/cities Delete
cityRoutes.delete('/:id',
    CityController.deleteCity
);

module.exports = cityRoutes;