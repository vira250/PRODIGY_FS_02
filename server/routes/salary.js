import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import { addSalary, getSalary } from '../controllers/salaryController.js'
const router = express.Router()

router.post('/add', authMeiddleware, addSalary)
router.get('/:id', authMeiddleware, getSalary)


export default router