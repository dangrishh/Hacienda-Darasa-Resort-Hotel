// src/controllers/inquiryController.ts
import { Request, Response } from 'express';
import Inquiry from '../models/Inquiry';

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { fullName, contactNumber, email, fbLink, messages } = req.body;
    const newInquiry = new Inquiry({ fullName, contactNumber, email, fbLink, messages });
    await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
    // console.log('Inquiry submitted successfully:', newInquiry);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting inquiry', error });
    // console.error('Error submitting inquiry:', error);
  }
};

export const getInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json({ inquiries });
    // console.log('Inquiries:', inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error });
    // console.error('Error fetching inquiries:', error);
  }
}


