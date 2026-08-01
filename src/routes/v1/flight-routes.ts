import { Router } from 'express';
import { createFlight, getAllFlights, getFlight, deleteFlight, updateSeats } from '../../controllers/flight-controller';
import { validateSchema } from '../../middlewares/validate-schema';
import { CreateFlightSchema, UpdateSeatsSchema } from '../../schemas/flight-schema';

const router = Router();

router.post('/', validateSchema(CreateFlightSchema), createFlight);
router.get('/', getAllFlights);
router.get('/:id', getFlight);
router.delete('/:id', deleteFlight);
router.patch('/:id/seats', validateSchema(UpdateSeatsSchema), updateSeats);

export default router;
