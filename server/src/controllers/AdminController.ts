import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUsers, RoomDetails } from '../models/AdminUsers';
import uploadRooms from '../middleware/uploadRooms'; 

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
