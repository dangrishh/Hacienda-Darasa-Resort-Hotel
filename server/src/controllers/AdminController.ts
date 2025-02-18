import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AdminUsers, RoomDetails } from '../models/AdminUsers';
import { Cottages } from '../models/Cottages';
import { EventHall } from '../models/EventHall';
import { DayTourRates } from '../models/DayTourRates';
import { SwimRate } from '../models/SwimRates'; // Import Schema

import upload from '../middleware/uploadMiddleware'; // Import Multer middleware

// Register Controller
export const registerAdminUser = async (req: Request, res: Response): Promise<void> => {
    const { fullname, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await AdminUsers.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new AdminUsers({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
};

// Login Controller
export const loginAdminUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await AdminUsers.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};

export const createRoomDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, rates, extraPersonCharge, amenities } = req.body;

        // Ensure rates are properly formatted
        if (!Array.isArray(rates) || rates.length === 0) {
            res.status(400).json({ message: 'Rates must be an array with at least one item.' });
            return 
        }

        // Check if all rates include maxPersons
        for (const rate of rates) {
            if (!rate.maxPersons) {
                res.status(400).json({ message: 'Each rate must include maxPersons.' });
                return 
            }
        }

        // Check if room already exists
        const existingRoom = await RoomDetails.findOne({ name });
        if (existingRoom) {
            res.status(400).json({ message: 'Room details already exist' });
            return;
        }

        // Create a new Room with multiple rate options
        const newRoom = new RoomDetails({
            name,
            rates,
            extraPersonCharge,
            amenities,
        });

        await newRoom.save();
        res.status(201).json({ message: 'Room Details added successfully', room: newRoom });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


export const updateRoomDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { RoomDetailsId } = req.params;
        const { rate, extraPersonCharge, amenities } = req.body;

        const updatedRoomDetails = await RoomDetails.findByIdAndUpdate(
            RoomDetailsId,
            { name, rate, extraPersonCharge,  amenities },
            { new: true, runValidators: true }
        );

        if (!updatedRoomDetails) {
            res.status(404).json({ message: 'Room Details not found' });
            return;
        }

        res.status(200).json({ message: 'Room Details updated successfully', room: updatedRoomDetails });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteRoomDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { RoomDetailsId } = req.params;

        const deletedRoomDetails = await RoomDetails.findByIdAndDelete(RoomDetailsId);

        if (!deletedRoomDetails) {
            res.status(404).json({ message: 'Room Details not found' });
            return;
        }

        res.status(200).json({ message: 'Room Details deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
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

export const createEventHall = async (req: Request, res: Response): Promise<void> => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
  
      try {
        const { name, quantity, capacity, rate } = req.body;
        const imagePaths = req.files 
          ? (req.files as Express.Multer.File[]).map(file => `public/uploads/${file.filename}`)
          : [];
  
        const newEventHall = new EventHall({
          name,
          quantity,
          capacity,
          rate,
          images: imagePaths,
        });
  
        await newEventHall.save();
  
        res.status(201).json({ message: 'Event Hall added successfully', eventHall: newEventHall });
      } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
      }
    });
  };

export const createDayTourRate = async (req: Request, res: Response): Promise<void> => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
  
      try {
        const { roomType, price } = req.body;
        const imagePaths = req.files 
          ? (req.files as Express.Multer.File[]).map(file => `public/uploads/${file.filename}`)
          : [];
  
        const newDayTourRate = new DayTourRates({
          roomType,
          price,
          images: imagePaths,
        });
  
        await newDayTourRate.save();
  
        res.status(201).json({ message: 'Day Tour Rate added successfully', dayTourRate: newDayTourRate });
      } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
      }
    });
  };

  export const createCottage = async (req: Request, res: Response): Promise<void> => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        const { name, quantity, price } = req.body;

        // ✅ Store only relative paths, removing local directory details
        const imagePaths = req.files 
          ? (req.files as Express.Multer.File[]).map(file => `public/uploads/${file.filename}`)
          : [];

        const newCottage = new Cottages({
          name,
          quantity,
          price,
          images: imagePaths,
        });

        await newCottage.save();

        res.status(201).json({ message: 'Cottage added successfully', cottage: newCottage });
      } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
      }
    });
};

export const createSwimRate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { type, startDate, startTime, endTime, rates, minPax } = req.body;
  
      if (!type || !startDate || !startTime || !endTime || !rates) {
         res.status(400).json({ message: 'Missing required fields' });
         return
      }

      const imagePaths = req.files 
      ? (req.files as Express.Multer.File[]).map(file => `public/uploads/${file.filename}`)
      : [];
  
      const newSwimRate = new SwimRate({
        type,
        startDate: new Date(startDate), // Convert to Date object
        startTime, // Store as HH:MM string
        endTime, // Store as HH:MM string
        rates,
        images: imagePaths,
        minPax: type === 'night' ? minPax : undefined, // Only for night swim
      });
  
      await newSwimRate.save();
      res.status(201).json({ message: 'Swim rate added successfully', swimRate: newSwimRate });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };