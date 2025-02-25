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
    getRoomsByStatus
} from "../controllers/RoomsController";



const router = express.Router();

router.post("/createRoom", createRoom);
router.get("/rooms", getAllRooms);
router.get("/rooms/:id", getRoomById);

router.get('/room-details', getAllRoomsDetials);
router.get('/room-details/:id', getRoomsDetials);

router.put("/updateRoom/:id", updateRoom);
router.delete("/deleteRoom/:id", deleteRoom);


router.get("/filtering-by-status", getRoomsByStatus);

export default router;
