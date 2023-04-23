import dataCtrl from '@/controllers/dataCtrl';
import indexCtrl from '@/controllers/indexCtrl';
import queryCtrl from '@/controllers/queryCtrl';
import { Router } from 'express';

const router = Router();

router.get('/query/0', queryCtrl.getIncomeCar);
router.get('/query/1', queryCtrl.getMalesAboveThousand);
router.get('/query/2', queryCtrl.getQuote);
router.get('/query/3', queryCtrl.getCars);
router.get('/query/4', queryCtrl.aggregateCities);
router.post('/users', dataCtrl.createUser);
router.get('/users', dataCtrl.getAllData);
router.get('/', indexCtrl);

export default router;
