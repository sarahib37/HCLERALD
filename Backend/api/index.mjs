import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './authRoute.js'
import userRouter from './userRoute.js'
import quoteRouter from './quoteRoute.js'
import path from 'path'

const __dirname = path.resolve()

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'https://hclerald-flnf.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))



app.use(cookieParser())

const PORT = process.env.PORT || 3000

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/quote', quoteRouter)

app.use(express.static(path.join(__dirname, '/Frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})