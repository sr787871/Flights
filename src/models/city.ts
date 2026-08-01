import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CityAttributes {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CityCreationAttributes extends Optional<CityAttributes, 'id'> {}

export class City extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
    declare id: number;
    declare name: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

City.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    tableName: 'Cities'
});
