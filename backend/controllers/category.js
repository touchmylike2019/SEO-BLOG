
const Category = require('../models/category')
const slugify = require('slugify')

exports.create = (req, res) => {
    const { name } = req.body
    // สมมติว่า req.body คือ { "name": "NEXT.JS" } slug จะมีค่าเป็น next.js
    //สมมติว่า req.body คือ { "name": "google colab" } slug จะมีค่าเป็น google-colab
    let slug = slugify(name).toLowerCase()

    let category = new Category({ name, slug })

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'name is duplicate'
            })
        }
        res.json(data)
    })
}

exports.list = (req, res) => {

    Category.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'name is duplicate'
            })
        }
        res.json(data)
    })
}

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    //ค้นหาด้วย slug
    Category.findOne({ slug }).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'category not found'
            })
        }
        res.json(category)
    })
}

exports.remove = (req, res) => {
    // params คือ :slug ใน /category/:slug
    const slug = req.params.slug.toLowerCase()
    Category.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'name is duplicate'
            })
        }
        res.json({
            message: 'Category deleted successfully'
        })
    })
}