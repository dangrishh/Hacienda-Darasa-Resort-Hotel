import { Request, Response } from 'express';
import Chat from '../models/Chats';

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sender, senderType, customer, content } = req.body;

    if (!sender || !senderType || !customer || !content) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    let chat = await Chat.findOne({ customer });

    if (!chat) {
      chat = new Chat({ customer, messages: [] });
    }

    chat.messages.push({
      sender,
      senderType, 
      content,
      timestamp: new Date(),
      read: false,
    });

    await chat.save();
    res.status(201).json({ message: "Message sent!", data: chat });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getCustomerMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer } = req.params;

    if (!customer) {
      res.status(400).json({ error: "Customer ID is required" });
      return;
    }

    const chat = await Chat.findOne({ customer });

    if (!chat) {
      res.status(404).json({ message: "No chat found for this customer" });
      return;
    }

    res.json(chat.messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const getAllChatsForStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const chats = await Chat.find().sort({ updatedAt: -1 }); // Latest chats first
    res.json(chats);
  } catch (error) {
    console.error("Error fetching all chats:", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};
