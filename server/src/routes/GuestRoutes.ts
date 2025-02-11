// src/routes/inquiryRoutes.ts
import express, { Request, Response } from 'express';
import { createInquiry, getInquiries } from '../controllers/GuestController';
const router = express.Router();

router.post('/inquiries', createInquiry);

router.get('/inquiries', getInquiries);

router.get('/testing', (req: Request, res: Response) => {
    res.send('Hello World');
});


export default router;