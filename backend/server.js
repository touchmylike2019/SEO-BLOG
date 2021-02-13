const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
// bring routes
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const tagRoutes = require('./routes/tag')

// app
const app = express()

// db
mongoose
    .connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))

// middlewares
app.use(morgan('dev')) // เเสดง log ที่ผู้ใช้เข้ามา 
app.use(bodyParser.json()) // เพื่อรับ parameter จาก Body ได้(req.body)
// app.use(cookieParser())

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

// routes
app.use('/api', blogRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', tagRoutes)

// port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})