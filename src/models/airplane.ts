import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface AirplaneAttributes {
    id: number;
    modelNumber: string;
    capacity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AirplaneCreationAttributes extends Optional<AirplaneAttributes, 'id'> {}

export class Airplane extends Model<AirplaneAttributes, AirplaneCreationAttributes> implements AirplaneAttributes {
    declare id: number;
    declare modelNumber: string;
    declare capacity: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Airplane.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 200,
        validate: {
            max: 1000
        }
    }
}, {
    sequelize,
    tableName: 'Airplanes'
});
