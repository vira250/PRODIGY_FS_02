import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import { addSalary } from '../controllers/salaryController.js'
const router = express.Router()

router.post('/add', authMeiddleware, addSalary)

export default router