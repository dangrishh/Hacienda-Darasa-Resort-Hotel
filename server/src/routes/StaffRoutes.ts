import express from 'express';
import { registerStaffUser, loginStaffUser } from '../controllers/StaffController';

const router = express.Router();

// Register Route
router.post('/register', registerStaffUser);

// Login Route
router.post('/login', loginStaffUser);

export default router;
