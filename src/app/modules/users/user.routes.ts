import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// app routers  
router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUsers);
router.get('/users/:userId', UserControllers.getSingleUser);
router.put('/users/:userId', UserControllers.updateUser);
router.delete('/users/:userId', UserControllers.deleteUser);

router.put('/users/:userId/orders', UserControllers.deleteUser);

export const UserRoutes = router;