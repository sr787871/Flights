import { CrudRepository } from './crud-repository';
import { Airplane } from '../models/airplane';

export class AirplaneRepository extends CrudRepository<Airplane> {
    constructor() {
        super(Airplane);
    }
}

export const airplaneRepository = new AirplaneRepository();
