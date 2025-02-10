// src/routes/inquiryRoutes.ts
import express from 'express';
<<<<<<< HEAD
import { createInquiry } from '../controllers/GuestController';
=======
import { createInquiry } from '../controllers/Guest';
>>>>>>> 004aa383d1c0299bb80799b994979231aef22caa

const router = express.Router();

router.post('/inquiries', createInquiry);

export default router;