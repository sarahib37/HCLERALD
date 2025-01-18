import express from 'express'
import { signIn, signup, google, signOut } from '../controllers/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signIn)
router.post('/google', google)
router.get('/signout', signOut)

export default router