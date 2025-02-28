// src/routes/roomRoutes.ts
import express from "express";
import { 
    createRoom, 
    getAllRooms, 
    getRoomById, 
    getAllRoomsDetials, 
    getRoomsDetials,
    updateRoom,
    deleteRoom,
    getRoomsByStatus,
    getRoomsByStatusGrouped,
} from "../controllers/RoomsController";
import { Request, Response, NextFunction } from "express";



const router = express.Router();

router.post("/createRoom", createRoom);
router.get("/rooms", getAllRooms);
router.get("/rooms/:id", getRoomById);

router.get('/room-details', getAllRoomsDetials);
router.get('/room-details/:id', getRoomsDetials);
router.put("/updateRoom/:id", updateRoom);
router.delete("/deleteRoom/:id", deleteRoom);

router.get("/filtering-by-status", getRoomsByStatus);
router.get("/filtering-by-details", getRoomsByStatusGrouped);


export default router;
