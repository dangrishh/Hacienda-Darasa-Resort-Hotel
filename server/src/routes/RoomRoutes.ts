// src/routes/roomRoutes.ts
import express from "express";
import { createRoom, getAllRooms, getRoomById } from "../controllers/RoomsController";

const router = express.Router();

router.post("/createRoom", createRoom);
router.get("/rooms", getAllRooms);
router.get("/rooms/:id", getRoomById);

export default router;
