import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUsers, Category } from '../models/AdminUsers';

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

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, quantity, checkIn, checkOut, rate, totalPax, amenities } = req.body;

        // ✅ Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            res.status(400).json({ message: 'Category already exists' });
            return;
        }

        const newCategory = new Category({
            name,
            quantity,
            checkIn,
            checkOut,
            rate,
            totalPax,
            amenities
        });

        await newCategory.save();

        res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

  // Get all categories
export const getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.params; // Get the category ID from URL params
        const { name, quantity, checkIn, checkOut, rate, totalPax, amenities } = req.body;

        // ✅ Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        // ✅ Check if a category with the new name already exists (to prevent duplicate names)
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                res.status(400).json({ message: 'A category with this name already exists' });
                return;
            }
        }

        // ✅ Update category fields
        category.name = name ?? category.name;
        category.quantity = quantity ?? category.quantity;
        category.checkIn = checkIn ?? category.checkIn;
        category.checkOut = checkOut ?? category.checkOut;
        category.rate = rate ?? category.rate;
        category.totalPax = totalPax ?? category.totalPax;
        category.amenities = amenities ?? category.amenities;

        await category.save();

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// ✅ Delete category by ID
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
