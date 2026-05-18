import express from 'express';
import { addEmployee, getEmployees, searchEmployees } from '../controllers/employeeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', protect, searchEmployees);
router.post('/', protect, addEmployee);
router.get('/', protect, getEmployees);

export default router;
