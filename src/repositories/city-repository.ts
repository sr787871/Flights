import { CrudRepository } from './crud-repository';
import { City } from '../models/city';

export class CityRepository extends CrudRepository<City> {
    constructor() {
        super(City);
    }
}

export const cityRepository = new CityRepository();
