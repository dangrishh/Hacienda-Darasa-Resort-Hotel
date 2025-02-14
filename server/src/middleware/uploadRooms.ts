import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads'); // Save images in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// ✅ File Filter (Allow only images)
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('../public/uploads')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

// ✅ Multer Middleware (Max 3 images)
const upload = multer({ storage, fileFilter }).array('images', 3);