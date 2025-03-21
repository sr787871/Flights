const CrudRepository = require('./crud-repository');
const {Airplane} = require('../models')

class AirplaneRepository extends CrudRepository{
    constructor(){
        super(Airplane); // with this super keyword we can call the constructor of parent class
    }
}

module.exports = AirplaneRepository;