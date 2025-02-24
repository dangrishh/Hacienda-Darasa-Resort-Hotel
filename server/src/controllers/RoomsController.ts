import { Request, Response } from "express";
import {RoomDetails, Room} from "../models/Rooms";

export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await Room.find().populate("details");
    //const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ error: "Room ID is required" });
      return;
    }
    
    const room = await Room.findById(id).populate("details");
    //const room = await Room.findById(id);

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }
    
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Failed to fetch room" });
  }
};

export const createRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, details, pictures } = req.body;
      
      if (!name || !details) {
        res.status(400).json({ error: "Name and details are required" });
        return;
      }
      
      const newRoom = new Room({
        name,
        details,
        pictures: pictures || null,
        booked: "free",
      });
      
      await newRoom.save();
      res.status(201).json({ message: "Room created successfully", data: newRoom });
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({ error: "Failed to create room" });
    }
  };

export const getAllRoomsDetials = async (req: Request, res: Response): Promise<void> => {
    try {
        const rooms = await RoomDetails.find();

        res.status(200).json({ message: 'Room Details retrieved successfully', rooms });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getRoomsDetials = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
    
        if (!id) {
        res.status(400).json({ error: "Room Detail ID is required" });
        return;
        }
        const rooms = await RoomDetails.findById(id);

        res.status(200).json({ message: 'Room Details retrieved successfully', rooms });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
  