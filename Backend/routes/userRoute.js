import express from 'express'
import { deleteUser, getUsers, updateAdmin, updateUserInfo } from '../controllers/user.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/update/:id', verifyToken, updateUserInfo)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/users', getUsers)
router.patch('/users/:id', updateAdmin)

export default router