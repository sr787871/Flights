import { Op } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { flightRepository, FlightRepository } from '../repositories/flight-repository';
import { CreateFlightInput, UpdateSeatsInput } from '../schemas/flight-schema';
import { AppError } from '../utils/errors/app-error';

export class FlightServiceClass {
    private repo: FlightRepository;

    constructor(repo: FlightRepository = flightRepository) {
        this.repo = repo;
    }

    async createFlight(data: CreateFlightInput) {
        try {
            const departureTime = new Date(data.departureTime);
            const arrivalTime = new Date(data.arrivalTime);

            if (departureTime >= arrivalTime) {
                throw new AppError('Departure time must be strictly before Arrival time', StatusCodes.BAD_REQUEST);
            }

            const flight = await this.repo.create({
                ...data,
                departureTime,
                arrivalTime
            });
            return flight;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            if (error.name === 'SequelizeValidationError') {
                const explanation = error.errors.map((e: any) => e.message).join(', ');
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllFlights(query: any) {
        const customFilter: any = {};
        let sortFilter: any[] = [];
        const endingTripTime = " 23:59:59";

        // Filter trips: e.g. DEL-BOM
        if (query.trips) {
            const [departureAirportId, arrivalAirportId] = query.trips.split("-");
            if (departureAirportId && arrivalAirportId) {
                customFilter.departureAirportId = departureAirportId;
                customFilter.arrivalAirportId = arrivalAirportId;
            }
        }

        // Filter price range: e.g. 1000-5000
        if (query.price) {
            const [minPrice, maxPrice] = query.price.split("-");
            customFilter.price = {
                [Op.gte]: minPrice ? Number(minPrice) : 0,
                [Op.lte]: maxPrice ? Number(maxPrice) : 100000
            };
        }

        // Filter tripDate: e.g. 2025-12-25
        if (query.tripDate) {
            customFilter.departureTime = {
                [Op.gte]: query.tripDate,
                [Op.lte]: query.tripDate + endingTripTime
            };
        }

        // Sorting: e.g. price_ASC, departureTime_DESC
        if (query.sort) {
            const params = query.sort.split(',');
            sortFilter = params.map((param: string) => param.split('_'));
        }

        const page = parseInt(query.page as string) || 1;
        const limit = parseInt(query.limit as string) || 10;

        try {
            const flights = await this.repo.getAllFlights(customFilter, sortFilter, page, limit);
            return flights;
        } catch (error) {
            throw new AppError('Cannot fetch data of all flights', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getFlight(id: number) {
        try {
            const flight = await this.repo.get(id);
            return flight;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('The flight you requested is not present', StatusCodes.NOT_FOUND);
        }
    }

    async deleteFlight(id: number) {
        try {
            const response = await this.repo.destroy(id);
            return response;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('The flight you requested to delete is not present', StatusCodes.NOT_FOUND);
        }
    }

    async updateRemainingSeats(data: { flightId: number; seats: number; dec?: boolean }) {
        try {
            const response = await this.repo.updateRemainingSeats(data.flightId, data.seats, data.dec !== false);
            return response;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError('Cannot update seats of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export const FlightService = new FlightServiceClass();
