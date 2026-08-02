import { Router } from 'express';
import { createAirplane, getAirplanes, getAirplane, destroyAirplane, updateAirplane } from '../../controllers/airplane-controller';
import { validateSchema } from '../../middlewares/validate-schema';
import { requireRole } from '../../middlewares/require-role';
import { CreateAirplaneSchema, UpdateAirplaneSchema } from '../../schemas/flight-schema';

const router = Router();

router.post('/', requireRole('admin', 'flight_company'), validateSchema(CreateAirplaneSchema), createAirplane);
router.get('/', getAirplanes);
router.get('/:id', getAirplane);
router.delete('/:id', requireRole('admin'), destroyAirplane);
router.patch('/:id', validateSchema(UpdateAirplaneSchema), updateAirplane);

export default router;

