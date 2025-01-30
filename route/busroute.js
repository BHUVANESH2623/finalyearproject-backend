import express from 'express';
import { busroutes } from '../controller/busroute.js';

const router = express.Router();

router.get('/route',busroutes);

export default router;