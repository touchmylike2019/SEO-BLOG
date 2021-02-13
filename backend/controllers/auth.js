const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const user = require('../models/user')

exports.signup = (req, res) => {
    // หา email ใน document
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        if (err) {
            console.log('SIGNUP ERROR ', err) // see server console for error
            return res.status(400).json({
                // dont send error object
                // error: err
                error: 'Could not signup user'
            })
        }

        const { name, email, password } = req.body
        let username = shortId.generate() // เช่น xkykny6lr เป็น username
        let profile = `${process.env.CLIENT_URL}/profile/${username}` // http://localhost:3000/profile/XkYKNy6lr

        let newUser = new User({ name, email, password, profile, username })
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                message: 'Signup success! Please signin.'
            })
        })
    })
}

exports.signin = (req, res) => {
    // login เช็คเเค่ email เเละ password
    const { email, password } = req.body
    // ตรวจสอบว่ามีผู้ใช้อยู่หรือไม่
    User.findOne({ email }).exec((err, user) => {
        //ถ้า error หรือ ไม่มี ผู้ใช้
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            })
        }
        // การ authenticate เเละตรวจสอบว่า password ตรงกันไหม
        // authenticate(password) เป็น method ที่สร้างไว้ใน user model เพื่อเอาไว้ตรวจสอบ password
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            })
        }

        // สร้าง token เเละ ส่งไปยัง client
        // user._id คือ ObjectId ของผู้ใช้ เเละ ให้ token มีอายุการใช้งาน 1 วัน
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        // นำ token ไปเก็บที่ cookie
        res.cookie('token', token, { expiresIn: '1d' })
        // ถ้าตรวจสอบว่ามีผู้ใช้จะส่ง token ออกไป
        const { _id, username, name, email, role } = user
        //ตัวอย่าง token เช่น eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE2ZTdhN2E0M2E0OTAzMjQyZjZhNDMiLCJpYXQiOjE2MTIxMTUxMDcsImV4cCI6MTYxMjIwMTUwN30.MaWShBpm6ODN9t5gRGIQmPZH5-ap8XZXPRohKfsb3dI
        return res.json({
            token,
            user: { _id, username, name, email, role }
        })
    })
}

exports.signout = (req, res) => {
    // ล้าง token ที่เก็บใน cookie
    res.clearCookie('token')
    res.json({
        message: 'Signout success'
    })
}

// ตรวจสอบความถูกต้อง JWT ของ request นั้น
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

exports.authMiddleware = (req, res, next) => {
    // req.auth._id ได้มาจากการฟังก์ชัน requireSignin ที่ใช้ userProperty: 'auth'
    const authUserId = req.auth._id
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user
        next()
    })
}

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.auth._id
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        // role 1 คือ admin เเละ 0 คือ ผู้ใช้
        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            })
        }

        req.profile = user
        next()
    })
}