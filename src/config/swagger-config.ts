export const flightSwaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: '✈️ Flight & Airplane Management Microservice API',
        version: '1.0.0',
        description: 'Comprehensive API documentation for managing Flights, Airplanes, Airports, and Cities in the Airplane Booking System.'
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'API Gateway (Recommended)'
        },
        {
            url: 'http://localhost:3000',
            description: 'Direct Flight Microservice'
        }
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{ BearerAuth: [] }],
    paths: {
        '/api/v1/flights': {
            get: {
                summary: 'Search & List Flights',
                description: 'Search flights with optional filters (`trips=DEL-BOM`, `price=1000-5000`, `tripDate=2026-12-25`, `sort=price_ASC`), pagination (`page=1`, `limit=10`).',
                parameters: [
                    { name: 'trips', in: 'query', schema: { type: 'string' }, example: 'DEL-BOM' },
                    { name: 'price', in: 'query', schema: { type: 'string' }, example: '1000-5000' },
                    { name: 'tripDate', in: 'query', schema: { type: 'string' }, example: '2026-12-25' },
                    { name: 'sort', in: 'query', schema: { type: 'string' }, example: 'price_ASC' },
                    { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
                    { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }
                ],
                responses: {
                    '200': { description: 'Successfully retrieved flights' },
                    '500': { description: 'Server Error' }
                }
            },
            post: {
                summary: 'Create a new Flight',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['flightNumber', 'airplaneId', 'departureAirportId', 'arrivalAirportId', 'arrivalTime', 'departureTime', 'price', 'totalSeats'],
                                properties: {
                                    flightNumber: { type: 'string', example: 'UK-808' },
                                    airplaneId: { type: 'integer', example: 1 },
                                    departureAirportId: { type: 'string', example: 'DEL' },
                                    arrivalAirportId: { type: 'string', example: 'BOM' },
                                    departureTime: { type: 'string', example: '2026-12-25T10:00:00.000Z' },
                                    arrivalTime: { type: 'string', example: '2026-12-25T13:00:00.000Z' },
                                    price: { type: 'number', example: 4500 },
                                    totalSeats: { type: 'number', example: 180 },
                                    boardingGate: { type: 'string', example: 'G12' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Flight created successfully' },
                    '400': { description: 'Validation error' }
                }
            }
        },
        '/api/v1/flights/{id}': {
            get: {
                summary: 'Get Flight Details by ID',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    '200': { description: 'Flight details' },
                    '404': { description: 'Flight not found' }
                }
            },
            delete: {
                summary: 'Delete Flight by ID',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    '200': { description: 'Flight deleted' },
                    '404': { description: 'Flight not found' }
                }
            }
        },
        '/api/v1/flights/{id}/seats': {
            patch: {
                summary: 'Reserve/Restore Flight Seats',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['seats'],
                                properties: {
                                    seats: { type: 'integer', example: 2 },
                                    dec: { type: 'boolean', example: true, description: 'True to decrement seats, False to restore seats' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': { description: 'Seats updated successfully' },
                    '400': { description: 'Insufficient seats available' }
                }
            }
        },
        '/api/v1/airplanes': {
            get: {
                summary: 'List All Airplanes',
                responses: { '200': { description: 'List of airplanes' } }
            },
            post: {
                summary: 'Create a new Airplane',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['modelNumber', 'capacity'],
                                properties: {
                                    modelNumber: { type: 'string', example: 'Boeing737' },
                                    capacity: { type: 'number', example: 220 }
                                }
                            }
                        }
                    }
                },
                responses: { '201': { description: 'Airplane created' } }
            }
        },
        '/api/v1/airplanes/{id}': {
            get: {
                summary: 'Get Airplane Details',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: { '200': { description: 'Airplane details' } }
            },
            delete: {
                summary: 'Delete Airplane',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: { '200': { description: 'Airplane deleted' } }
            }
        },
        '/api/v1/airports': {
            get: {
                summary: 'List All Airports',
                responses: { '200': { description: 'List of airports' } }
            },
            post: {
                summary: 'Create Airport',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'code', 'cityId'],
                                properties: {
                                    name: { type: 'string', example: 'Indira Gandhi International Airport' },
                                    code: { type: 'string', example: 'DEL' },
                                    cityId: { type: 'integer', example: 1 },
                                    address: { type: 'string', example: 'Palam, New Delhi' }
                                }
                            }
                        }
                    }
                },
                responses: { '201': { description: 'Airport created' } }
            }
        },
        '/api/v1/cities': {
            post: {
                summary: 'Create City',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name'],
                                properties: {
                                    name: { type: 'string', example: 'New Delhi' }
                                }
                            }
                        }
                    }
                },
                responses: { '201': { description: 'City created' } }
            }
        }
    }
};
