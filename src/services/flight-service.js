const {FlightRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require("http-status-codes");
const { compareTime } = require('../utils/helpers/dateTime-helpers');

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        const flight = await flightRepository.create(data);
        // console.log(flight);
        if(!compareTime(flight.dataValues.arrivalTime,flight.dataValues.departureTime)){
            throw new AppError("ArrivalTime",StatusCodes.BAD_REQUEST)
            // We have to delete the flight which was created before this compareTime function
        }
        // console.log(airplane,"dwukhnghntons")
        return flight;
    } catch (error) {
        console.log(error);
        if(error.name == "SequelizeValidationError"){
            let explanation = []
            error.errors.forEach(err=>explanation.push(err.message))
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        if(error.explanation == "ArrivalTime"){
            throw new AppError("Arrival Time is not Correct",StatusCodes.BAD_REQUEST)
        }
        if(error.name == "SequelizeForeignKeyConstraintError"){
            throw new AppError("Airplane Id, departureAirportId, arrivalAirportId must be correct or foreign key constraint fails",StatusCodes.INTERNAL_SERVER_ERROR)
        }
        throw new AppError('Cannot create a new flight object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

module.exports = {
    createFlight,
}