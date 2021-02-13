const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            max: 32,
            unique: true,
            index: true,
            lowercase: true
        },
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        profile: {
            type: String,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        about: {
            type: String
        },
        role: {
            type: Number,
            default: 0
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        resetPasswordLink: {
            data: String,
            default: ''
        }
    },
    { timestamps: true }
)

userSchema
    .virtual('password')
    // function รับ password(virtual) มาเป็น parameter
    .set(function(password) {
        // สร้างตัวแปรชั่วคราวที่เรียกว่า _password
        this._password = password
        // สร้าง salt
        this.salt = this.makeSalt()
        // encryptPassword เข้ารหัสให้เป็น hash password
        this.hashed_password = this.encryptPassword(password)
    }) 

userSchema.methods = {
    // authenticate เป็นฟังก์ชันที่รับ password มาเข้ารหัสเเละนำมาเทียบกับ hashed_password ที่ถูกสร้างเอาไว้ว่าตรงกันไหมถ้าใช่จะรีเทริน true
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if(!password) return '' //ถ้าเป็น emptry ให้รีเทริน ''
        try {
            return crypto // รีเทริน password ออกมาเช่น d1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35
                .createHmac('sha1', this.salt) //sha1 เป็นชื่อของการเข้ารหัสชนิดหนึ่งเเละนำมารวมกับ salt 
                .update(password)
                .digest('hex')
        } catch(err) {
            return ''
        }
    },
    makeSalt: function() { // สุ่มตัวเลขออกมาเช่น 1414634447694
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
}

module.exports = mongoose.model('User', userSchema)