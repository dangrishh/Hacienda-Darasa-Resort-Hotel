import express from 'express';
import { sendMessage, getMessages, getUserMessages } from '../controllers/ChatController';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/messages', getMessages);
router.get('/messages/:customer', getUserMessages)

export default router;
