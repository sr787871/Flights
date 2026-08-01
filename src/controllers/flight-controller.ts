import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FlightService } from '../services/flight-service';
import { SuccessResponse, ErrorResponse } from '../utils/common';

export async function createFlight(req: Request, res: Response) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: Number(req.body.airplaneId),
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: Number(req.body.price),
            boardingGate: req.body.boardingGate,
            totalSeats: Number(req.body.totalSeats),
        });
        return res.status(StatusCodes.CREATED).json(SuccessResponse(flight, "Flight created successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function getAllFlights(req: Request, res: Response) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        return res.status(StatusCodes.OK).json(SuccessResponse(flights, "Flights retrieved successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function getFlight(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const flight = await FlightService.getFlight(id);
        return res.status(StatusCodes.OK).json(SuccessResponse(flight, "Flight details fetched successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function deleteFlight(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const response = await FlightService.deleteFlight(id);
        return res.status(StatusCodes.OK).json(SuccessResponse(response, "Flight deleted successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}

export async function updateSeats(req: Request, res: Response) {
    try {
        const flightId = Number(req.params.id);
        const seats = Number(req.body.seats);
        const dec = req.body.dec !== false;

        const response = await FlightService.updateRemainingSeats({
            flightId,
            seats,
            dec,
        });
        return res.status(StatusCodes.OK).json(SuccessResponse(response, "Flight seats updated successfully"));
    } catch (error: any) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse(error));
    }
}
