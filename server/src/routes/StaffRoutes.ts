import express from 'express';
import { 
    registerStaffUser, 
    loginStaffUser,
    updatePaymentStatus,
    updateBookingStatus
 } from '../controllers/StaffController';

const router = express.Router();

// Register Route
router.post('/register', registerStaffUser);

// Login Route
router.post('/login', loginStaffUser);

router.put('/bookings/:bookingId/payment-status', updatePaymentStatus);
router.put('/bookings/update-status/:bookingId', updateBookingStatus);


export default router;
