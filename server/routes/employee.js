import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import {addEmployee, upload, getEmployees, getEmployee} from '../controllers/employeeController.js'

const router = express.Router()

router.get('/', authMeiddleware, getEmployees)
router.post('/add', authMeiddleware, upload.single('image'), addEmployee)
router.get('/:id', authMeiddleware, getEmployee)
// router.put('/:id', authMeiddleware, updateDepartment)
// router.delete('/:id', authMeiddleware, deleteDepartment)

export default router