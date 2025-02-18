// src/routes/roomRoutes.ts
import express from "express";
import { 
    createRoom, 
    getAllRooms, 
    getRoomById, 
    getAllRoomsDetials, 
    getRoomsDetials
} from "../controllers/RoomsController";

const router = express.Router();

router.post("/createRoom", createRoom);
router.get("/rooms", getAllRooms);
router.get("/rooms/:id", getRoomById);

router.get('/room-details', getAllRoomsDetials);
router.get('/room-details/:id', getRoomsDetials);

export default router;
