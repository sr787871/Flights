import { Router } from 'express';
import { createAirplane, getAirplanes, getAirplane, destroyAirplane, updateAirplane } from '../../controllers/airplane-controller';
import { validateSchema } from '../../middlewares/validate-schema';
import { CreateAirplaneSchema, UpdateAirplaneSchema } from '../../schemas/flight-schema';

const router = Router();

router.post('/', validateSchema(CreateAirplaneSchema), createAirplane);
router.get('/', getAirplanes);
router.get('/:id', getAirplane);
router.delete('/:id', destroyAirplane);
router.patch('/:id', validateSchema(UpdateAirplaneSchema), updateAirplane);

export default router;
