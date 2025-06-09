import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import {addDepartment, getDepartments} from '../controllers/departmentController.js'

const router = express.Router()

router.get('/', authMeiddleware, getDepartments)
router.post('/add', authMeiddleware, addDepartment)

export default router