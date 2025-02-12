import express from 'express';
import { sendMessage, getMessages, getClientMessages } from '../controllers/ChatController';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/messages', getMessages);
router.get('/messages/:customer', getClientMessages)

export default router;
