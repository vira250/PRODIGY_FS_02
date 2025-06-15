import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import { addLeave, getLeaves } from '../controllers/leaveController.js'

const router = express.Router()

router.post('/add', authMeiddleware, addLeave)
router.get('/:id', authMeiddleware, getLeaves)


export default router