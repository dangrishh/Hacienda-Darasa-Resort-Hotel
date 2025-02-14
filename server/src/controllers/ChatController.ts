import { Request, Response } from 'express';
import Chat from '../models/Chats';

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { sender, recipient, content } = req.body;

        if (!sender || !recipient || !content) {
            res.status(400).json({ error: 'Sender, recipient, and content are required' });
            return;
        }

        // Find an existing chat where the sender or recipient is involved
        let chat = await Chat.findOne({
            messages: { $elemMatch: { $or: [{ sender }, { recipient }] } }
        });

        // If no chat exists, create a new one
        if (!chat) {
            chat = new Chat({ messages: [] });
        }

        chat.messages.push({
            sender,
            recipient,
            content,
            timestamp: new Date(),
            read: false,
        });

        await chat.save();

        res.status(201).json({ message: 'Message sent!', data: chat });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await Chat.find().sort({ 'messages.timestamp': 1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

export const getUserMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user } = req.params; // User is either sender or recipient

        if (!user) {
            res.status(400).json({ error: "User identifier is required" });
            return;
        }

        const messages = await Chat.find({
            messages: { $elemMatch: { $or: [{ sender: user }, { recipient: user }] } }
        }).sort({ 'messages.timestamp': 1 });

        if (messages.length === 0) {
            res.status(404).json({ message: "No messages found for this user" });
            return;
        }

        res.json(messages);
    } catch (error) {
        console.error("Error fetching user messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};
