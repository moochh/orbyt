import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { registerRoutes } from './routes';
import { errorHandler } from './errors/handler';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Use routes
registerRoutes(app);

// Error Handler
app.use(errorHandler);

export default app;
