import { StatusCodes } from 'http-status-codes';
import { cityRepository, CityRepository } from '../repositories/city-repository';
import { CreateCityInput } from '../schemas/flight-schema';
import { AppError } from '../utils/errors/app-error';

export class CityServiceClass {
    private repo: CityRepository;

    constructor(repo: CityRepository = cityRepository) {
        this.repo = repo;
    }

    async createCity(data: CreateCityInput) {
        try {
            const city = await this.repo.create(data);
            return city;
        } catch (error: any) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const explanation = error.errors.map((e: any) => e.message).join(', ');
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteCity(id: number) {
        try {
            const response = await this.repo.destroy(id);
            return response;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('The city you requested to delete is not present', StatusCodes.NOT_FOUND);
        }
    }

    async updateCity(id: number, data: any) {
        try {
            await this.repo.update(id, data);
            return await this.repo.get(id);
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('Cannot update city details', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export const CityService = new CityServiceClass();
