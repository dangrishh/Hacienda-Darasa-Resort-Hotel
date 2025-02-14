
import express, { Router, Request, Response } from 'express';

import { 
    registerAdminUser, 
    loginAdminUser, 
} from '../controllers/AdminController';


import { 
    createRoom,
    deleteRoom, 
    getAllRooms, 
    updateRoom 
} from '../controllers/AdminController';


const router: Router = express.Router(); // Explicitly define the router type


// Register Route
router.post('/register', registerAdminUser);

// Login Route
router.post('/login', loginAdminUser);

// Room Routes
router.put('/room/update/:roomId', updateRoom);
router.delete('/room/delete/:roomId', deleteRoom);
router.get('/room/all', getAllRooms);
router.post('/room/create', createRoom);


export default router;
