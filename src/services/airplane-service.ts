import { StatusCodes } from 'http-status-codes';
import { airplaneRepository, AirplaneRepository } from '../repositories/airplane-repository';
import { CreateAirplaneInput, UpdateAirplaneInput } from '../schemas/flight-schema';
import { AppError } from '../utils/errors/app-error';
import { logger } from '../config';

export class AirplaneServiceClass {
    private repo: AirplaneRepository;

    constructor(repo: AirplaneRepository = airplaneRepository) {
        this.repo = repo;
    }

    async createAirplane(data: CreateAirplaneInput) {
        try {
            const airplane = await this.repo.create(data);
            return airplane;
        } catch (error: any) {
            logger.error(`Error in createAirplane: ${error.stack || error}`);
            if (error.name === 'SequelizeValidationError') {
                const explanation = error.errors.map((e: any) => e.message).join(', ');
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw new AppError(`Cannot create a new Airplane object: ${error.message || error}`, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirplanes() {
        try {
            const airplanes = await this.repo.getAll();
            return airplanes;
        } catch (error) {
            throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirplane(id: number) {
        try {
            const airplane = await this.repo.get(id);
            return airplane;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('The airplane you requested is not present', StatusCodes.NOT_FOUND);
        }
    }

    async destroyAirplane(id: number) {
        try {
            const response = await this.repo.destroy(id);
            return response;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('The airplane you requested to delete is not present', StatusCodes.NOT_FOUND);
        }
    }

    async updateAirplane(id: number, data: UpdateAirplaneInput) {
        try {
            await this.repo.update(id, data);
            return await this.getAirplane(id);
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('Cannot update airplane details', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export const AirplaneService = new AirplaneServiceClass();
