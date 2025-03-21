const CrudRepository = require('./crud-repository');
const {City} = require('../models')

class CityRepository extends CrudRepository{
    constructor(){
        super(City); // with this super keyword we can call the constructor of parent class
    }
}

module.exports = CityRepository;