const CrudRepository = require('./crud-repository');
const {Flight} = require('../models');
const { where } = require('sequelize');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight); // with this super keyword we can call the constructor of parent class
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where : filter,
            order : sort
        });
        return response;
    }
}

module.exports = FlightRepository;