// src/middleware/uploadMiddleware.ts

import multer from 'multer';
import path from 'path';

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../public/uploads'); // Ensure absolute path
        cb(null, uploadPath);
      },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage }).array('images', 3);

export default upload;
