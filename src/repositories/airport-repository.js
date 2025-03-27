const CrudRepository = require('./crud-repository');
const {Airport} = require('../models')

class AirportRepository extends CrudRepository{
    constructor(){
        super(Airport); // with this super keyword we can call the constructor of parent class
    }
}

module.exports = AirportRepository;