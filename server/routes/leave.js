import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import { addLeave, getLeaves , getLeave, getLeaveDetail, updateLeave} from '../controllers/leaveController.js'

const router = express.Router()

router.post('/add', authMeiddleware, addLeave)
router.get('/detail/:id', authMeiddleware, getLeaveDetail)
router.get('/:id/:role', authMeiddleware, getLeaves)
router.get('/', authMeiddleware, getLeave)
router.put('/:id', authMeiddleware, updateLeave)


export default router