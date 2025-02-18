import { Request } from 'express';
import multer from 'multer';
import path from 'path';

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Save images in "public/uploads"
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});

// ✅ File Filter (Allow only images)
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

// ✅ Multer Upload Middleware (Max 3 Images)
const uploadRooms = multer({ storage, fileFilter }).array('images', 3);

export default uploadRooms;
