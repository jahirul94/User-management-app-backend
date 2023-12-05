import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// app routers  
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);

router.put('/:userId/orders', UserControllers.createProduct);
router.get('/:userId/orders', UserControllers.getSpecificUserProduct);
router.get('/:userId/orders/total-price', UserControllers.getUserProductTotalPrice);

export const UserRoutes = router;