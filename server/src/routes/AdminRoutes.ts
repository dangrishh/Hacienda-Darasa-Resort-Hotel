
import express, { Router, Request, Response } from 'express';

import uploadRooms from '../middleware/uploadRooms'; // ✅ Import middleware

import { 
    registerAdminUser, 
    loginAdminUser, 
} from '../controllers/AdminController';


import { 
    createRoomDetails,
    deleteRoomDetails, 
    updateRoomDetails 
} from '../controllers/AdminController';


const router: Router = express.Router(); // Explicitly define the router type


// Register Route
router.post('/register', registerAdminUser);

// Login Route
router.post('/login', loginAdminUser);

// Room Routes
router.put('/room-details/update/:roomId', updateRoomDetails);
router.delete('/room-details/delete/:roomId', deleteRoomDetails);
router.post('/room-details/create', createRoomDetails);

export default router;
