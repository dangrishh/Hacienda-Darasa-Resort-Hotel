
import express, { Router, Request, Response } from 'express';

import { 
    registerAdminUser, 
    loginAdminUser, 
} from '../controllers/AdminController';


import { 
    createRoomDetails,
    deleteRoomDetails, 
    updateRoomDetails 
} from '../controllers/AdminController';

import {
    createEventHall,
    createDayTourRate,
    createCottage,
    createSwimRate
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

// Event Hall Route
router.post('/event-hall/create', createEventHall);

// Day Tour Rate Route
router.post('/day-tour-rate/create', createDayTourRate);

// Cottage Route
router.post('/cottage/create', createCottage);

// Swim Rate Route
router.post('/swim-rate/create', createSwimRate);

export default router;
