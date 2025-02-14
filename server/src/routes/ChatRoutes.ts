import express from 'express';
import { sendMessage, getCustomerMessages, getAllChatsForStaff } from '../controllers/ChatController';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/messages/:customer', getCustomerMessages);
router.get('/allMessages', getAllChatsForStaff)

export default router;
