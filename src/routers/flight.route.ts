import { Router } from 'express';

import {
    insertFlights,
    consultFlights
} from '../repository/flight';

const router: Router = Router();

router.post('/', insertFlights);
router.get('/', consultFlights);

export default router;
