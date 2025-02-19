import express from 'express';
import { 
    registerStaffUser, 
    loginStaffUser,
    updatePaymentStatus
 } from '../controllers/StaffController';

const router = express.Router();

// Register Route
router.post('/register', registerStaffUser);

// Login Route
router.post('/login', loginStaffUser);

router.put('/bookings/:bookingId/payment-status', updatePaymentStatus);

export default router;
