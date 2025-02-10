
import express, { Router, Request, Response } from 'express';
import { registerAdminUser, loginAdminUser, getCategories, createCategory, updateCategory,
    deleteCategory
 } from '../controllers/AdminController';

const router: Router = express.Router(); // Explicitly define the router type


// Register Route
router.post('/register', registerAdminUser);

// Login Route
router.post('/login', loginAdminUser);


// Category Route
router.get('/category', getCategories);
router.post('/category', createCategory);
router.put('/category/:id', updateCategory);  
router.delete('/category/:id', deleteCategory); 

export default router;
