const { CityRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require("http-status-codes")

const cityRepository = new CityRepository()

async function createCity(data){
    try {
        const city = await cityRepository.create(data)
        return city
    } catch (error) {
        console.log(error)
        if(error.name == "SequelizeValidationError" || error.name == 'SequelizeUniqueConstraintError' ){
            let explanation = []
            error.errors.forEach(err=>explanation.push(err.message))
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new City object",StatusCodes.INTERNAL_SERVER_ERROR)        
    }
}

async function deleteCity(id){
    try {
        const response = await cityRepository.destroy(id)
        return response
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('This city you request to delete is not present',error.statusCode)
        }
        throw new AppError('Cannot delete a city object',StatusCodes.INTERNAL_SERVER_ERROR)       
    }
}

async function updateCity(id,data){
    try {
        const city = await cityRepository.update(id,data)
        return city
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('This city you request to update is not present',error.statusCode)
        }
        throw new AppError('Cannot Update a city object',StatusCodes.INTERNAL_SERVER_ERROR)       
    }
}

module.exports = {
    createCity,
    deleteCity,
    updateCity,
}