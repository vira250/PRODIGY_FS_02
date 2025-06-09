import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import {addDepartment, getDepartments, getDepartment, updateDepartment , deleteDepartment} from '../controllers/departmentController.js'

const router = express.Router()

router.get('/', authMeiddleware, getDepartments)
router.post('/add', authMeiddleware, addDepartment)
router.get('/:id', authMeiddleware, getDepartment)
router.put('/:id', authMeiddleware, updateDepartment)
router.delete('/:id', authMeiddleware, deleteDepartment)

export default router