// Basic Lib imports
import router from './src/routes/api.js'
import cookieParser from 'cookie-parser';
import express from "express";
const app = express();

// Security Lib imports
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";

// Database Lib imports
import mongoose from "mongoose";

// Security Middlewares Implementation
dotenv.config();
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
// Request Limiter 
const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 3000});
app.use(limiter); 

// Database Connection
const URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/task_manager_app';
mongoose
  .connect(URL, { autoIndex: true })
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// Routing Implementation
app.use("/api/v1", router) 
  
// Undefined Route Handling
app.use((req, res) => {
  res.status(404).json({
    success: "fail",
    message: "Route Not Found",
  });
});  

export default app;