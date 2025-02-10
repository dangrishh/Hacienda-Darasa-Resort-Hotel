import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';

import GuestRoutes from './routes/GuestRoutes';
import Costumer from './routes/CostumerRoutes';
import StaffRoutes from './routes/StaffRoutes';
import AdminRoutes from './routes/AdminRoutes';
import ChatRoutes from './routes/ChatRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware
app.use(cors());
app.use(express.json());
app.use('/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/public/files', express.static(path.join(__dirname, 'public', 'files')));

// Middleware to set CORS headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

// Routes
app.use('/api/guest', GuestRoutes);
app.use('/api/costumer', Costumer);
app.use('/api/staff', StaffRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/chat', ChatRoutes);



app.get('/', (req: Request, res: Response) => {
  console.log("Hello from express"); 
  process.stdout.write('Flushed: Hello from express\n');  // ✅ Forces immediate output
  res.send('Hello World from Express and TypeScript');
});

app.get('/welcome', (req: Request, res: Response) => {
  console.log("Welcome endpoint hit!");
  res.send('Hello World');
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'your_default_mongo_uri';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });  