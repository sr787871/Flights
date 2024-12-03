const express = require("express");
const {InfoController} = require("../../controllers")

const airplaneroutes = require('./airplane-routes');

const v1Routes = express.Router();

v1Routes.use('/airplanes',airplaneroutes);

v1Routes.get('/info',InfoController.info)

module.exports = v1Routes;