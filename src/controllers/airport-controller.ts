import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AirportService } from '../services/airport-service';
import { SuccessResponse, ErrorResponse } from '../utils/common';

export async function createAirport(req: Request, res: Response) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            cityId: Number(req.body.cityId),
            address: req.body.address
        });
        return res.status(StatusCodes.CREATED).json(SuccessResponse(airport, "Airport created successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function getAirports(req: Request, res: Response) {
    try {
        const airports = await AirportService.getAirports();
        return res.status(StatusCodes.OK).json(SuccessResponse(airports, "Airports fetched successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function getAirport(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const airport = await AirportService.getAirport(id);
        return res.status(StatusCodes.OK).json(SuccessResponse(airport, "Airport fetched successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function destroyAirport(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const response = await AirportService.destroyAirport(id);
        return res.status(StatusCodes.OK).json(SuccessResponse(response, "Airport deleted successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function updateAirport(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedAirport = await AirportService.updateAirport(id, req.body);
        return res.status(StatusCodes.OK).json(SuccessResponse(updatedAirport, "Airport updated successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}
