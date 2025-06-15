import express from 'express'
import authMeiddleware from '../middleware/authMiddlware.js'
import changePassword from '../controllers/settingController.js'
const router = express.Router()

router.put('/change-password', authMeiddleware, changePassword)

export default router