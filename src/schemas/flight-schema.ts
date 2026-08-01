import { z } from 'zod';

export const CreateAirplaneSchema = z.object({
    body: z.object({
        modelNumber: z.string({ required_error: 'modelNumber is required' }).min(1),
        capacity: z.number({ required_error: 'capacity is required' }).positive().max(1000, 'Capacity cannot exceed 1000'),
    })
});

export const UpdateAirplaneSchema = z.object({
    body: z.object({
        modelNumber: z.string().optional(),
        capacity: z.number().positive().max(1000).optional(),
    })
});

export const CreateAirportSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Airport name is required' }).min(2),
        code: z.string({ required_error: 'Airport code is required' }).min(2).max(10),
        cityId: z.number({ required_error: 'cityId is required' }).positive(),
        address: z.string().optional(),
    })
});

export const CreateCitySchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'City name is required' }).min(2),
    })
});

export const CreateFlightSchema = z.object({
    body: z.object({
        flightNumber: z.string({ required_error: 'flightNumber is required' }).min(2),
        airplaneId: z.number({ required_error: 'airplaneId is required' }).positive(),
        departureAirportId: z.string({ required_error: 'departureAirportId is required' }),
        arrivalAirportId: z.string({ required_error: 'arrivalAirportId is required' }),
        arrivalTime: z.string({ required_error: 'arrivalTime is required' }),
        departureTime: z.string({ required_error: 'departureTime is required' }),
        price: z.number({ required_error: 'price is required' }).positive(),
        boardingGate: z.string().optional(),
        totalSeats: z.number({ required_error: 'totalSeats is required' }).positive(),
    })
});

export const UpdateSeatsSchema = z.object({
    body: z.object({
        seats: z.number({ required_error: 'seats number is required' }).positive(),
        dec: z.boolean().optional().default(true),
    })
});

export type CreateAirplaneInput = z.infer<typeof CreateAirplaneSchema>['body'];
export type UpdateAirplaneInput = z.infer<typeof UpdateAirplaneSchema>['body'];
export type CreateAirportInput = z.infer<typeof CreateAirportSchema>['body'];
export type CreateCityInput = z.infer<typeof CreateCitySchema>['body'];
export type CreateFlightInput = z.infer<typeof CreateFlightSchema>['body'];
export type UpdateSeatsInput = z.infer<typeof UpdateSeatsSchema>['body'];
