import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUsers, Room } from '../models/AdminUsers';

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



// ✅ Admin can post a new room
export const createRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, roomNumbers, quantity, rate, extraPersonCharge, checkIn, checkOut, amenities } = req.body;

        // ✅ Check if the room name already exists
        const existingRoom = await Room.findOne({ name });
        if (existingRoom) {
            res.status(400).json({ message: 'Room already exists' });
            return;
        }

        const newRoom = new Room({
            name,
            roomNumbers,
            quantity,
            rate,
            extraPersonCharge,
            checkIn,
            checkOut,
            amenities,
        });

        await newRoom.save();

        res.status(201).json({ message: 'Room added successfully', room: newRoom });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { roomId } = req.params;
        const { name, roomNumbers, quantity, rate, extraPersonCharge, checkIn, checkOut, amenities } = req.body;

        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            { name, roomNumbers, quantity, rate, extraPersonCharge, checkIn, checkOut, amenities },
            { new: true, runValidators: true }
        );

        if (!updatedRoom) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }

        res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { roomId } = req.params;

        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
    try {
        const rooms = await Room.find();

        res.status(200).json({ message: 'Rooms retrieved successfully', rooms });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
