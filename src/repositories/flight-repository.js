const CrudRepository = require('./crud-repository');
const {Flight,Airplane,Airport,City} = require('../models');
const { Sequelize } = require('sequelize');
const db = require("../models")

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight); // with this super keyword we can call the constructor of parent class
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where : filter,
            order : sort,
            include : [ // to querying the join in sequelize we have include,
                { 
                    model : Airplane,
                    required : true, // using required we are doing inner join
                    as : 'airplaneDetails' // this alias we also have to mention in the association which is in model file 
                },
                {
                    model : Airport,
                    required : true,
                    as : 'departureAirport',
                    on : { // this on is on which column we have a apply a foreign Key and without this on we the fKey is automatically applied to the airplane.id col
                        col1 : Sequelize.where(Sequelize.col("Flight.departureAirportId") , "=" , Sequelize.col("departureAirport.code"))
                    },
                    include : {
                        model : City,
                        required : true,
                    }
                },
                {
                    model : Airport,
                    required : true,
                    as : 'arrivalAirport',
                    on : {
                        col1 : Sequelize.where(Sequelize.col("Flight.arrivalAirportId") , "=" , Sequelize.col("arrivalAirport.code"))
                    },
                    include : {
                        model : City,
                        required : true,
                    }
                }
            ]
        });
        return response;
    }

    async updateRemainingSeats(flightId,seats,dec = 1){
        //row-level locking (pessimistic concurrency control)
        await db.sequelize.query(`SELECT * from flights WHERE flights.id=${flightId} FOR UPDATE;`)
        const flight = await Flight.findByPk(flightId)
        if(parseInt(dec)){
            console.log('inside dec')
            await flight.decrement('totalSeats',{by:seats});
        }else{
            console.log('inside inc',dec)
            await flight.increment('totalSeats',{by:seats})
        }
        return flight;
    }
    
}

module.exports = FlightRepository;