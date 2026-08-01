import { Model, ModelStatic } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/errors/app-error';

export class CrudRepository<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async create(data: any): Promise<T> {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(id: number | string): Promise<number> {
        const response = await this.model.destroy({
            where: { id: id } as any
        });
        if (!response) {
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(id: number | string): Promise<T> {
        const response = await this.model.findByPk(id);
        if (!response) {
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(): Promise<T[]> {
        const response = await this.model.findAll();
        return response;
    }

    async update(id: number | string, data: any): Promise<[number]> {
        const response = await this.model.update(data, {
            where: { id: id } as any
        });
        if (!response[0]) {
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return response;
    }
}
