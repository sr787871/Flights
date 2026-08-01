import { CrudRepository } from './crud-repository';
import { Flight } from '../models/flight';
import { Airplane } from '../models/airplane';
import { Airport } from '../models/airport';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/errors/app-error';

export class FlightRepository extends CrudRepository<Flight> {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter: any, sort: any, page: number = 1, limit: number = 10): Promise<{ count: number; rows: Flight[] }> {
        const offset = (page - 1) * limit;
        const response = await Flight.findAndCountAll({
            where: filter,
            order: sort,
            offset: offset,
            limit: limit,
            include: [
                {
                    model: Airplane,
                    as: 'airplaneDetail',
                },
                {
                    model: Airport,
                    as: 'departureAirport',
                },
                {
                    model: Airport,
                    as: 'arrivalAirport',
                }
            ]
        });
        return response;
    }

    async updateRemainingSeats(flightId: number, seats: number, dec: boolean = true): Promise<Flight> {
        const flight = await Flight.findByPk(flightId);
        if (!flight) {
            throw new AppError("Not able to find the flight resource", StatusCodes.NOT_FOUND);
        }

        if (dec) {
            if (flight.totalSeats < seats) {
                throw new AppError("Not enough seats available to reserve", StatusCodes.BAD_REQUEST);
            }
            await flight.decrement('totalSeats', { by: seats });
        } else {
            await flight.increment('totalSeats', { by: seats });
        }

        await flight.reload();
        return flight;
    }
}

export const flightRepository = new FlightRepository();
