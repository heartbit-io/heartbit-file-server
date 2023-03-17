import express from 'express';
import { userRoutes } from './userRoutes';
import { healthcheck } from './healthCheck';

const router = express.Router();

router.use('/api/v1/healthcheck', healthcheck);
router.use('/api/v1/user_files', userRoutes);

export {router as routes }
