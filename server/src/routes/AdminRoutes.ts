import express from 'express';
import { registerUser, loginUser } from '../controllers/Admin';

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

export default router;
