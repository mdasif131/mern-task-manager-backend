import express from 'express';
import {
  loginUser,
  profileDetails,
  registration,
  updateUserProfile,
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/AuthVerifyMiddleware.js';
import { createTask, deleteTask, listTaskByStatus, taskStatusCount, updateTaskStatus } from '../controllers/taskController.js';

const router = express.Router();

// User Route
router.post('/register', registration);
router.post('/login', loginUser);

router.get('/profile-details', authenticate, profileDetails);
router.put('/update', authenticate, updateUserProfile);

// Task Route
router.post('/create-task', authenticate, createTask);
router.get('/update-task/:id/:status', authenticate, updateTaskStatus);
router.get('/list-task-by-status/:status',authenticate, listTaskByStatus)
router.get('/task-status-count',authenticate, taskStatusCount)
router.delete('/delete-task/:id',authenticate, deleteTask)

export default router;
