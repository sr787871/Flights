const {FlightService} = require("../services")
const {StatusCodes} = require("http-status-codes")
const {SuccessResponse , ErrorResponse} = require("../utils/common")

// Post : /airplane
// reqbody {modelNumber:'airbus320', capacity:200}

async function createFlight(req,res){
    try {
        const flight = await FlightService.createFlight({
            flightNumber  : req.body.flightNumber,
            airplaneId : req.body.airplaneId,
            departueAirportId : req.body.departueAirportId,
            arrivalAirportId : req.body.arrivalAirportId,
            arrivalTime : req.body.arrivalTime,
            departueTime : req.body.departueTime,
            boardingGate : req.body.boardingGate,
            totalSeats : req.body.totalSeats,
        });
        SuccessResponse.data = flight
        return res.status(StatusCodes.CREATED).json(SuccessResponse)        
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
}