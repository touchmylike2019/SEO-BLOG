  
const mongoose = require('mongoose')

//TAG ทำหน้าที่เหมือน Category เหมือนกัน แต่ tag ไม่สามารถมี sub-category ได้ ให้ใช้ tag ในการอธิบายเนื้อหาที่เฉพาะเจาะจงกว่า Category 

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        slug: {
            type: String,
            unique: true,
            index: true // Indexe เปรียบเสมือน การเขียนสารบัญที่ทำให้เราเข้าถึงข้อมูลได้เร็วขึ้น คล้ายๆกับ Primary key
            // เเหล่งข้อมูล
            // https://medium.com/scale360-engineering/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B3-index-%E0%B9%83%E0%B8%AB%E0%B9%89-mongodb-%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87-85c1daf490b6
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Tag', tagSchema)