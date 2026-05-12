import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import donationRoutes from './routes/donationRoutes';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/donations', donationRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorHandler);

export default app;
