import { Router } from 'express';
import airplaneRoutes from './airplane-routes';
import airportRoutes from './airport-routes';
import cityRoutes from './city-routes';
import flightRoutes from './flight-routes';

const router = Router();

router.use('/airplanes', airplaneRoutes);
router.use('/airports', airportRoutes);
router.use('/cities', cityRoutes);
router.use('/flights', flightRoutes);

export default router;
