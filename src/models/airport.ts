import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { City } from './city';

export interface AirportAttributes {
    id: number;
    name: string;
    code: string;
    address?: string;
    cityId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AirportCreationAttributes extends Optional<AirportAttributes, 'id' | 'address'> {}

export class Airport extends Model<AirportAttributes, AirportCreationAttributes> implements AirportAttributes {
    declare id: number;
    declare name: string;
    declare code: string;
    declare address: string;
    declare cityId: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Airport.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        unique: true,
    },
    cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    sequelize,
    tableName: 'Airports'
});

City.hasMany(Airport, { foreignKey: 'cityId', onDelete: 'CASCADE' });
Airport.belongsTo(City, { foreignKey: 'cityId', as: 'cityDetail' });
