const CrudRepository = require('./crud-repository');
const {Flight} = require('../models')

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight); // with this super keyword we can call the constructor of parent class
    }
}

module.exports = FlightRepository;