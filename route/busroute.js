import express from 'express';
import { getRoute, getRoutes, postRoute, searchLocation, searchRoute } from '../controller/busroute.js';

const router = express.Router();

router.get('/routes',getRoutes);
router.post('/addroute',postRoute);
router.get('/:routeName',getRoute);
router.post('/searchRoute',searchRoute);
router.post('/searchLocation',searchLocation);

export default router;