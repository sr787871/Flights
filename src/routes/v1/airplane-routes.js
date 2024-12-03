const express = require("express");
const {AirplaneController} = require("../../controllers")
const airplaneRoutes = express.Router();

// api/v1/airplanes POST
airplaneRoutes.post('/',AirplaneController.createAirplane);

module.exports = airplaneRoutes;