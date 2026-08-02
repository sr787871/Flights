import { Router } from 'express';
import { createFlight, getAllFlights, getFlight, deleteFlight, updateSeats } from '../../controllers/flight-controller';
import { validateSchema } from '../../middlewares/validate-schema';
import { requireRole } from '../../middlewares/require-role';
import { CreateFlightSchema, UpdateSeatsSchema } from '../../schemas/flight-schema';

const router = Router();

router.post('/', requireRole('admin', 'flight_company'), validateSchema(CreateFlightSchema), createFlight);
router.get('/', getAllFlights);
router.get('/:id', getFlight);
router.delete('/:id', requireRole('admin'), deleteFlight);
router.patch('/:id/seats', validateSchema(UpdateSeatsSchema), updateSeats);

export default router;

