import { Request, Response } from 'express';
import Chat from '../models/Chats';

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { customer, sender, content } = req.body;
  
      if (!customer || !sender || !content) {
        res.status(400).json({ error: 'Customer, sender, and content are required' });
        return;
      }
  
      let chat = await Chat.findOne({ customer });
  
      if (!chat) {
        chat = new Chat({ customer, messages: [] });
      }
  
      chat.messages.push({
        sender,
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
      const messages = await Chat.find().sort({ timestamp: 1 });
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };

  export const getClientMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const { customer } = req.params; // Assuming the customer name is passed as a route parameter
  
      if (!customer) {
        res.status(400).json({ error: "Customer identifier is required" });
        return;
      }
  
      const messages = await Chat.find({ customer }).sort({ timestamp: 1 });
  
      if (messages.length === 0) {
        res.status(404).json({ message: "No messages found for this customer" });
        return;
      }
  
      res.json(messages);
    } catch (error) {
      console.error("Error fetching customer messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  };
  
