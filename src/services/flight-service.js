const {FlightRepository} = require('../repositories');
const {Op} = require("sequelize")
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require("http-status-codes");
const { compareTime } = require('../utils/helpers/dateTime-helpers');

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error);
        if(error.name == "SequelizeValidationError"){
            let explanation = []
            error.errors.forEach(err=>explanation.push(err.message))
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        if(error.name == "SequelizeForeignKeyConstraintError"){
            throw new AppError("Airplane Id, departureAirportId, arrivalAirportId must be correct or foreign key constraint fails",StatusCodes.INTERNAL_SERVER_ERROR)
        }
        throw new AppError('Cannot get a flight object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getAllFlights(query){
    let customFilter = {}
    let sortFilter = []
    if(query.trips){
        [departureAirportId,arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price){
        [minPrice,maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between] : [minPrice,((maxPrice == undefined ? 20000 : maxPrice))]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }
    if(query.tripDate){
        const tripDateStart = new Date(query.tripDate + 'T00:00:00.000Z'); // Start of the day in UTC
        const tripDateEnd = new Date(query.tripDate + 'T23:59:59.999Z');   // End of the day in UTC
        customFilter.departureTime = {
            // [Op.gte] : query.tripDate // this will give me the all the flights which will be departed after departure time
            [Op.between] : [tripDateStart,tripDateEnd]
        }
    }
    if(query.sort){
        const params = query.sort.split(",")
        const sortFilters = params.map((param)=>param.split("_"))
        sortFilter = sortFilters
    }
    console.log(customFilter)
    try {
        let flights = await flightRepository.getAllFlights(customFilter,sortFilter)
        return flights;
    } catch (error) {
        console.log(error);
        if(error.name == "SequelizeValidationError"){
            let explanation = []
            error.errors.forEach(err=>explanation.push(err.message))
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        console.log(error)
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('This flight you request is not present',error.statusCode)
        }
        throw new AppError('Cannot get a flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}