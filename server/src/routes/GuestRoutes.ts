// src/routes/inquiryRoutes.ts
import express from 'express';
<<<<<<< HEAD
import { Request, Response, Router } from 'express';

=======
<<<<<<< HEAD
import { createInquiry } from '../controllers/GuestController';
=======
>>>>>>> cb7e454a6a2b9ed1295ca1f8e1ae5051e87d8ffb
import { createInquiry } from '../controllers/Guest';
>>>>>>> 004aa383d1c0299bb80799b994979231aef22caa

const router = express.Router();

router.post('/inquiries', createInquiry);

router.get('/welcome', (req: Request, res: Response): void => {
    res.send('Hi, welcome guest!');
});


export default router;