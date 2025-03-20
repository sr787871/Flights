const { response } = require("express");
const {AirplaneService} = require("../services")
const {StatusCodes} = require("http-status-codes")
const {SuccessResponse , ErrorResponse} = require("../utils/common")

// Post : /airplane
// reqbody {modelNumber:'airbus320', capacity:200}

async function createAirplane(req,res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane
        return res.status(StatusCodes.CREATED).json(SuccessResponse)        
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// GET : /airplanes
// reqbody : {}
async function getAirplanes(req,res){
    try {
        const airplane = await AirplaneService.getAirplanes()
        SuccessResponse.data = airplane
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// GET : /airplanes/:id
// req.body : {}
async function getAirplane(req,res){
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id)
        SuccessResponse.data = airplane
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
}