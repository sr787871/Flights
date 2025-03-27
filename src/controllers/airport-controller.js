const { response } = require("express");
const {AirportService} = require("../services")
const {StatusCodes} = require("http-status-codes")
const {SuccessResponse , ErrorResponse} = require("../utils/common")

// Post : /airports
// reqbody {name:'CGI', code:'DLI',address:'Delhi',cityId:10}

async function createAirport(req,res){
    try {
        const airport = await AirportService.createAirport({
            name : req.body.name,
            code : req.body.code,
            cityId : req.body.cityId,
        });
        SuccessResponse.data = airport
        return res.status(StatusCodes.CREATED).json(SuccessResponse)        
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// GET : /airports
// reqbody : {}
async function getAirports(req,res){
    try {
        const airports = await AirportService.getAirports()
        SuccessResponse.data = airports
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// GET : /airports/:id
// req.body : {}
async function getAirport(req,res){
    try {
        const airport = await AirportService.getAirport(req.params.id)
        SuccessResponse.data = airport
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// GET : /airports/:id
// req.body : {}
async function destroyAirport(req,res){
    try {
        const response = await AirportService.destroyAirport(req.params.id)
        SuccessResponse.data = response
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

// PATCH : /airports/:id
// req.body : {code:'DLI'}
async function updateAirport(req,res){
    try {
        const updatedAirport = await AirportService.updateAirport(req.params.id,req.body)
        SuccessResponse.data = updatedAirport
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}