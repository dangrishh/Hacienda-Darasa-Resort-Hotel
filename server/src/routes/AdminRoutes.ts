import express from 'express';
import { registerAdminUser, loginAdminUser } from '../controllers/AdminController';

const router = express.Router();

// Register Route
router.post('/register', registerAdminUser);

// Login Route
router.post('/login', loginAdminUser);

export default router;
