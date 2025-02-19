import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import CostumerUser from '../models/CostumerUsers';
import { AdminUsers } from '../models/AdminUsers';
import {RoomDetails} from '../models/Rooms';
import {Booking} from '../models/Bookings';


// Register Controller
export const registerCostumerUser = async (req: Request, res: Response): Promise<void> => {
    const { fullname, email, contactNumber, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await CostumerUser.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new CostumerUser({
            fullname,
            email,
            contactNumber,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
};

// Login Controller
export const loginCostumerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await CostumerUser.findOne({ email });
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


export const selectCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { costumerId, categoryId } = req.body; 

        // ✅ Check if the user exists
        const user = await CostumerUser.findById(costumerId);
        if (!user) {
            console.log('User not found');
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // ✅ Check if the category exists
        const category = await RoomDetails.findById(categoryId);
        if (!category) {
            console.log('Category not found');
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        // ✅ Save the selected category in the user’s profile
        user.selectedCategory = category._id as mongoose.Types.ObjectId;

        await user.save();

        res.status(200).json({
            message: 'Category selected successfully',
            category: category.toObject(),
            user: user.toObject(),
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};