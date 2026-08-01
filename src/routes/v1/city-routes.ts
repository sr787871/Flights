import { Router } from 'express';
import { createCity, deleteCity, updateCity } from '../../controllers/city-controller';
import { validateSchema } from '../../middlewares/validate-schema';
import { CreateCitySchema } from '../../schemas/flight-schema';

const router = Router();

router.post('/', validateSchema(CreateCitySchema), createCity);
router.delete('/:id', deleteCity);
router.patch('/:id', updateCity);

export default router;
