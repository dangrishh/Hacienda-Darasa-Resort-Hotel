import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserAdmin from '../models/AdminUsers';

// Register Controller
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { fullname, email, password } = req.body;

    try {
        // Check if the user already exists
        const adminExists = await UserAdmin.findOne({ email });
        if (adminExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserAdmin({
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
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const admin = await UserAdmin.findOne({ email });
        if (!admin) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        // Check if the account is approved
        if (!admin.isApproved) {
            res.status(403).json({ message: 'Account not approved. Please wait for admin approval.' });
            return;
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { adminId: admin._id },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};
