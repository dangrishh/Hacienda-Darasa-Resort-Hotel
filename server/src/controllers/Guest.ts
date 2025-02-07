// src/controllers/inquiryController.ts
import { Request, Response } from 'express';
import Inquiry from '../models/Inquiry';

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { fullName, contactNumber, email, fbAccount, messages } = req.body;
    const newInquiry = new Inquiry({ fullName, contactNumber, email, fbAccount, messages });
    await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
    // console.log('Inquiry submitted successfully:', newInquiry);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting inquiry', error });
    // console.error('Error submitting inquiry:', error);
  }
};

