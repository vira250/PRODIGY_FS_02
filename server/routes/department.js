import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import {addDepartment} from '../controllers/departmentController.js'

const router = express.Router()

router.post('/add', authMeiddleware, addDepartment)

export default router