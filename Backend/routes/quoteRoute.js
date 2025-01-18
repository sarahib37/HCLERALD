import express from 'express'

import { addNewQuote, deleteQuote, getQuotes, updateQuote, uploadImage } from '../controllers/quote.js'

const router = express.Router()

router.post('/addQuote', addNewQuote)
router.post('/uploadImage', uploadImage)
router.get('/quotes', getQuotes)
router.delete('/quotes/:id', deleteQuote)
router.put('/updateQuote/:quoteId', updateQuote)

export default router