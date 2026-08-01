import { Router } from 'express';
import v1ApiRoutes from './v1';

const router = Router();

router.use('/v1', v1ApiRoutes);

export default router;
