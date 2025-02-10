import express from 'express';
import { registerCostumerUser, loginCostumerUser } from '../controllers/CostumerController';

const router = express.Router();

// Register Route
router.post('/register', registerCostumerUser);

// Login Route
router.post('/login', loginCostumerUser);

export default router;
