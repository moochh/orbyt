import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { registerRoutes } from './routes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Base route
app.get('/', (_req, res) => {
  res.send('🚀 API is running...');
});

// Use routes
registerRoutes(app);

export default app;
