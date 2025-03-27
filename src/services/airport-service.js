const {AirportRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require("http-status-codes")

const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        console.log(error);
        if(error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError"){
            let explanation = []
            error.errors.forEach(err=>explanation.push(err.message))
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        if(error.name == "SequelizeDatabaseError" || error.name == "SequelizeForeignKeyConstraintError"){
            throw new AppError('cityId cannot be empty or cityId must be there in the city table(foreign key constraint fails)',StatusCodes.INTERNAL_SERVER_ERROR)
        }
        throw new AppError('Cannot create a new airport object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot create a new airport object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('This airport you request is not present',error.statusCode)
        }
        throw new AppError('Cannot create a new airport object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('This airport you request to delete is not present',error.statusCode)
        }
        throw new AppError('Cannot delete a airport object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id,data){
    try {
        const updatedAirport = await airportRepository.update(id,data);
        return updatedAirport;
    } catch (error) {
        console.log(error)
        if(error.name == 'SequelizeUniqueConstraintError'){
            let explanation = []
            error.errors.forEach(err=>explanation.push(err.message))
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        if(error.name == "SequelizeDatabaseError" || error.name == "SequelizeForeignKeyConstraintError"){
            throw new AppError('cityId cannot be empty or cityId must be there in the city table(foreign key constraint fails)',StatusCodes.INTERNAL_SERVER_ERROR)
        }
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('This airport you request to update is not present',error.statusCode)
        }
        throw new AppError('Cannot update a new airport object',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport,
}