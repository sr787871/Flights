import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Airplane } from './airplane';
import { Airport } from './airport';

export interface FlightAttributes {
    id: number;
    flightNumber: string;
    airplaneId: number;
    departureAirportId: string;
    arrivalAirportId: string;
    arrivalTime: Date;
    departureTime: Date;
    price: number;
    boardingGate?: string;
    totalSeats: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FlightCreationAttributes extends Optional<FlightAttributes, 'id' | 'boardingGate'> {}

export class Flight extends Model<FlightAttributes, FlightCreationAttributes> implements FlightAttributes {
    declare id: number;
    declare flightNumber: string;
    declare airplaneId: number;
    declare departureAirportId: string;
    declare arrivalAirportId: string;
    declare arrivalTime: Date;
    declare departureTime: Date;
    declare price: number;
    declare boardingGate: string;
    declare totalSeats: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Flight.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Airplane,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Airport,
            key: 'code'
        },
        onDelete: 'CASCADE'
    },
    arrivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Airport,
            key: 'code'
        },
        onDelete: 'CASCADE'
    },
    arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    boardingGate: {
        type: DataTypes.STRING,
    },
    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'Flights'
});

Airplane.hasMany(Flight, { foreignKey: 'airplaneId', onDelete: 'CASCADE' });
Flight.belongsTo(Airplane, { foreignKey: 'airplaneId', as: 'airplaneDetail' });

Airport.hasMany(Flight, { foreignKey: 'departureAirportId', sourceKey: 'code', onDelete: 'CASCADE' });
Flight.belongsTo(Airport, { foreignKey: 'departureAirportId', targetKey: 'code', as: 'departureAirport' });

Airport.hasMany(Flight, { foreignKey: 'arrivalAirportId', sourceKey: 'code', onDelete: 'CASCADE' });
Flight.belongsTo(Airport, { foreignKey: 'arrivalAirportId', targetKey: 'code', as: 'arrivalAirport' });
