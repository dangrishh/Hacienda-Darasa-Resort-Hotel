// src/routes/inquiryRoutes.ts
import express from 'express';
import { createInquiry } from '../controllers/GuestController';

const router = express.Router();

router.post('/inquiries', createInquiry);

export default router;