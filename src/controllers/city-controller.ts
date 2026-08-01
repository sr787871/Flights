import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CityService } from '../services/city-service';
import { SuccessResponse, ErrorResponse } from '../utils/common';

export async function createCity(req: Request, res: Response) {
    try {
        const city = await CityService.createCity({ name: req.body.name });
        return res.status(StatusCodes.CREATED).json(SuccessResponse(city, "City created successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function deleteCity(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const response = await CityService.deleteCity(id);
        return res.status(StatusCodes.OK).json(SuccessResponse(response, "City deleted successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function updateCity(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const city = await CityService.updateCity(id, req.body);
        return res.status(StatusCodes.OK).json(SuccessResponse(city, "City updated successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}
