import { StatusCodes } from 'http-status-codes';
import { airportRepository, AirportRepository } from '../repositories/airport-repository';
import { CreateAirportInput } from '../schemas/flight-schema';
import { AppError } from '../utils/errors/app-error';

export class AirportServiceClass {
    private repo: AirportRepository;

    constructor(repo: AirportRepository = airportRepository) {
        this.repo = repo;
    }

    async createAirport(data: CreateAirportInput) {
        try {
            const airport = await this.repo.create(data);
            return airport;
        } catch (error: any) {
            if (error.name === 'SequelizeValidationError') {
                const explanation = error.errors.map((e: any) => e.message).join(', ');
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirports() {
        try {
            const airports = await this.repo.getAll();
            return airports;
        } catch (error) {
            throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirport(id: number) {
        try {
            const airport = await this.repo.get(id);
            return airport;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('The airport you requested is not present', StatusCodes.NOT_FOUND);
        }
    }

    async destroyAirport(id: number) {
        try {
            const response = await this.repo.destroy(id);
            return response;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('The airport you requested to delete is not present', StatusCodes.NOT_FOUND);
        }
    }

    async updateAirport(id: number, data: any) {
        try {
            await this.repo.update(id, data);
            return await this.getAirport(id);
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('Cannot update airport details', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export const AirportService = new AirportServiceClass();
