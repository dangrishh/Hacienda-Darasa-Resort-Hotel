import { Request, Response, NextFunction } from "express";

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

// get ( filtering by status)

export const getRoomsByStatus = async (req: Request, res: Response): Promise<void> => {
  try {

    const { status } = req.query; // Get the status from query parameters

    // Check if status is valid (optional validation)
    const allowedStatuses = ["free", "occupied", "reserved"];
    if (status && !allowedStatuses.includes(status as string)) {
      res.status(400).json({ error: "Invalid status. Allowed values: free, occupied, reserved" });
      return;
    }

    // Query based on the status
    const filter = status ? { booked: status } : {}; // If status is provided, filter by it

    const rooms = await Room.find(filter).populate("bookedBy");

    // const rooms = await Room.find(filter).populate("details bookedBy pictures");

    res.status(200).json({ message: "Rooms retrieved successfully", data: rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

// get ( filtering by status by ID )
export const getRoomsByStatusGrouped = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.query;

    // Validate input status
    const allowedStatuses = ["free", "occupied", "reserved"];
    if (!status || !allowedStatuses.includes(status as string)) {
      res.status(400).json({ error: "Invalid status. Allowed values: free, occupied, reserved" });
      return;
    }

    const rooms = await Room.aggregate([
      {
        $match: { booked: status } // Filter rooms by status
      },
      {
        $lookup: {
          from: "roomdetails", // Match with RoomDetails collection
          localField: "details",
          foreignField: "_id",
          as: "roomDetails"
        }
      },
      { $unwind: "$roomDetails" },
      {
        $group: {
          _id: "$roomDetails.name", // Group by RoomDetails name
          rooms: { $push: { _id: "$_id", name: "$name" } }
        }
      }
    ]);

    res.status(200).json({ message: "Rooms grouped by status", data: rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
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

  export const updateRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, details, booked, bookedBy, bookingStartTime, bookingEndTime, pictures } = req.body;
  
      const updatedRoom = await Room.findByIdAndUpdate(
        id,
        {
          name,
          details,
          booked,
          bookedBy,
          bookingStartTime,
          bookingEndTime,
          pictures,
        },
        { new: true, runValidators: true } // Returns the updated document and ensures validation
      );
  
      if (!updatedRoom) {
        res.status(404).json({ error: "Room not found" });
        return;
      }
  
      res.status(200).json({ message: "Room updated successfully", data: updatedRoom });
    } catch (error) {
      console.error("Error updating room:", error);
      res.status(500).json({ error: "Failed to update room" });
    }
  };

  export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const deletedRoom = await Room.findByIdAndDelete(id);
  
      if (!deletedRoom) {
        res.status(404).json({ error: "Room not found" });
        return;
      }
  
      res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
      console.error("Error deleting room:", error);
      res.status(500).json({ error: "Failed to delete room" });
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
  