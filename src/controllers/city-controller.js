const { response } = require("express");
const {CityService} = require("../services")
const {StatusCodes} = require("http-status-codes")
const {SuccessResponse , ErrorResponse} = require("../utils/common")

async function createCity(req,res){
    try {
        const city = await CityService.createCity({name :req.body.name})
        SuccessResponse.data = city
        res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function deleteCity(req,res){
    try {
        const response = await CityService.deleteCity(req.params.id)
        SuccessResponse.data = response
        res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function updateCity(req,res){
    try {
        const city = await CityService.updateCity(req.params.id,req.body)
        SuccessResponse.data = city
        res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)      
    }
}
module.exports = {
    createCity,
    deleteCity,
    updateCity
}