const express = require("express");
const {InfoController} = require("../../controllers")

const airplaneroutes = require('./airplane-routes');
const cityRoutes = require("./city-routes");

const v1Routes = express.Router();

v1Routes.use('/airplanes',airplaneroutes);
v1Routes.use('/cities',cityRoutes)

v1Routes.get('/info',InfoController.info)

module.exports = v1Routes;