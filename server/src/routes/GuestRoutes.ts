// src/routes/inquiryRoutes.ts
import express, {Request, Response} from 'express';
import { createInquiry } from '../controllers/Guest';

const router = express.Router();

router.post('/inquiries', createInquiry);



export default router;