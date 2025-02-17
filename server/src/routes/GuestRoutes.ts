// src/routes/inquiryRoutes.ts
import express, { Request, Response } from 'express';
import { createInquiry, getInquiries } from '../controllers/GuestController';
const router = express.Router();

router.post('/inquiries', createInquiry);

router.get('/inquiries', getInquiries);

export default router;