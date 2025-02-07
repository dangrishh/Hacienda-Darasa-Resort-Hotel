// src/routes/inquiryRoutes.ts
import express from 'express';
import { createInquiry } from '../controllers/Guest';

const router = express.Router();

router.post('/inquiries', createInquiry);

export default router;