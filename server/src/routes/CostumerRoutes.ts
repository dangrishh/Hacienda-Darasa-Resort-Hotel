import express from 'express';
import { registerCostumerUser, loginCostumerUser, selectCategory } from '../controllers/CostumerController';

const router = express.Router();

// Register Route
router.post('/register', registerCostumerUser);

// Login Route
router.post('/login', loginCostumerUser);

// ✅ Select an existing category (User ID required)
router.post('/categories/book-selected', selectCategory);



export default router;
