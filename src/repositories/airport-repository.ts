import { CrudRepository } from './crud-repository';
import { Airport } from '../models/airport';

export class AirportRepository extends CrudRepository<Airport> {
    constructor() {
        super(Airport);
    }
}

export const airportRepository = new AirportRepository();
