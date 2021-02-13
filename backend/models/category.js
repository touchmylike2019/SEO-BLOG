
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        slug: { //slug คือ ข้อความที่ใช้แทนโพสต์และ search engine จะหา keyword จาก slug ของโพสต์นั้น
            type: String,
            unique: true,
            index: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Category', categorySchema)