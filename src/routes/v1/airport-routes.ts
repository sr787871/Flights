import { Router } from 'express';
import { createAirport, getAirports, getAirport, destroyAirport, updateAirport } from '../../controllers/airport-controller';
import { validateSchema } from '../../middlewares/validate-schema';
import { CreateAirportSchema } from '../../schemas/flight-schema';

const router = Router();

router.post('/', validateSchema(CreateAirportSchema), createAirport);
router.get('/', getAirports);
router.get('/:id', getAirport);
router.delete('/:id', destroyAirport);
router.patch('/:id', updateAirport);

export default router;
