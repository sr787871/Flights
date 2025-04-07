const CrudRepository = require('./crud-repository');
const {Flight,Airplane,Airport,City} = require('../models');
const { Sequelize } = require('sequelize');
const db = require("../models");
const { addRowLockOnFlights } = require('./queries');

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

    async updateRemainingSeats(flightId,seats,dec = true){
        
        const t = await db.sequelize.transaction();
        //Now this db query will always be done in only one transaction
        try {
            //row-level locking (pessimistic concurrency control)
            await db.sequelize.query(addRowLockOnFlights(flightId))
            const flight = await Flight.findByPk(flightId)
            if(+dec){
                console.log('inside dec')
                await flight.decrement('totalSeats',{by:seats},{transaction:t});
            }else{
                console.log('inside inc',dec)
                await flight.increment('totalSeats',{by:seats},{transaction:t})
            }
            await t.commit();
            return flight;
        } catch (error) {
            await t.rollback()
            throw error   
        }
    }
    
}

module.exports = FlightRepository;