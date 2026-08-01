import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AirplaneService } from '../services/airplane-service';
import { SuccessResponse, ErrorResponse } from '../utils/common';

export async function createAirplane(req: Request, res: Response) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: Number(req.body.capacity)
        });
        return res.status(StatusCodes.CREATED).json(SuccessResponse(airplane, "Airplane created successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function getAirplanes(req: Request, res: Response) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        return res.status(StatusCodes.OK).json(SuccessResponse(airplanes, "Airplanes fetched successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function getAirplane(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const airplane = await AirplaneService.getAirplane(id);
        return res.status(StatusCodes.OK).json(SuccessResponse(airplane, "Airplane details fetched successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function destroyAirplane(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const response = await AirplaneService.destroyAirplane(id);
        return res.status(StatusCodes.OK).json(SuccessResponse(response, "Airplane deleted successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function updateAirplane(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedAirplane = await AirplaneService.updateAirplane(id, req.body);
        return res.status(StatusCodes.OK).json(SuccessResponse(updatedAirplane, "Airplane updated successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}
