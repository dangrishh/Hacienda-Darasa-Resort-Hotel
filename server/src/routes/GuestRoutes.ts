// src/routes/inquiryRoutes.ts
import express from 'express';
import { Request, Response, Router } from 'express';

import { createInquiry } from '../controllers/Guest';

const router = express.Router();

router.post('/inquiries', createInquiry);

router.get('/welcome', (req: Request, res: Response): void => {
    res.send('Hi, welcome guest!');
});


export default router;