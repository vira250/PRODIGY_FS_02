import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import {addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId} from '../controllers/employeeController.js'

const router = express.Router()
router.get('/', authMeiddleware, getEmployees);

router.get('/department/:id', authMeiddleware, fetchEmployeesByDepId);

router.post('/add', authMeiddleware, upload.single('image'), addEmployee);

router.get('/:id', authMeiddleware, getEmployee);

router.put('/:id', authMeiddleware, updateEmployee);



router.get('/department/:id', authMeiddleware, fetchEmployeesByDepId)

export default router