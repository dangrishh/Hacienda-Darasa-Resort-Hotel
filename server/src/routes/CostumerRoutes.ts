import express from 'express';
import { 
    registerCostumerUser,
    loginCostumerUser, 
    selectCategory
} from '../controllers/CostumerController';

import {
    bookCustomerReservation,
    getBookings,
    getBookingById,
    getBookingPrice
} from '../controllers/BookingController';

const router = express.Router();

// Register Route
router.post('/register', registerCostumerUser);

// Login Route
router.post('/login', loginCostumerUser);

// ✅ Select an existing category (User ID required)
router.post('/categories/book-selected', selectCategory);

router.post('/bookings', bookCustomerReservation);
router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);
router.get('/bookings/:bookingId/price', getBookingPrice);



export default router;
