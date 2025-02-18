import express from 'express';
import { 
    registerCostumerUser,
    loginCostumerUser, 
    selectCategory,
    bookReservation,
    getBookings,
    getBookingById
} from '../controllers/CostumerController';

const router = express.Router();

// Register Route
router.post('/register', registerCostumerUser);

// Login Route
router.post('/login', loginCostumerUser);

// ✅ Select an existing category (User ID required)
router.post('/categories/book-selected', selectCategory);

router.post('/bookings', bookReservation);
router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);



export default router;
