const Blog = require('../models/blog')
const Category = require('../models/category')
const Tag = require('../models/tag')
const formidable = require('formidable') // ใช้สำหรับอัพโหลดไฟล์ form-data
const slugify = require('slugify')
const { stripHtml } = require('string-strip-html')
const _ = require('lodash') // ช่วยในเรื่องการจัดการจิปาถะอย่าง กรองข้อมูล, เรียงลำดับ, หาค่ามาก ค่าน้อย, หา item จาก array หรือ object, เอาเฉพาะค่าแรก ค่าสุดท้าย ฯลฯ
const fs = require('fs')
const { smartTrim } = require('../helpers/blog')

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            })
        }

        const { title, body, categories, tags } = fields

        if (!title || !title.length) {
            return res.status(400).json({
                error: 'title is required'
            })
        }

        if (!body || body.length < 200) {
            return res.status(400).json({
                error: 'Content is too short'
            })
        }

        if (!categories || categories.length === 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            })
        }

        if (!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            })
        }

        let blog = new Blog()
        blog.title = title
        blog.body = body
        blog.excerpt = smartTrim(body, 320, ' ', ' ...')
        blog.slug = slugify(title).toLowerCase()
        blog.mtitle = `${title} | ${process.env.APP_NAME}`
        blog.mdesc = stripHtml(body.substring(0, 160)).result
        blog.postedBy = req.auth._id

        // categories and tags
        let arrayOfCategories = categories && categories.split(',')
        let arrayOfTags = tags && tags.split(',')

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                })
            }
            blog.photo.data = fs.readFileSync(files.photo.path)
            blog.photo.contentType = files.photo.type
        }

        blog.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            // res.json(result)
            Blog.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
                (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Error'
                        })
                    } else {
                        Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
                            (err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: 'Error'
                                    })
                                } else {
                                    res.json(result)
                                }
                            }
                        )
                    }
                }
            )
        })

    })
}

exports.list = (req, res) => {
    Blog.find({})
        // คือ ref ซึ่งจะเป็นการบอก mongoose ให้รู้ว่าโมเดล blog นี้จะทำการอ้างอิงไปยัง Collections ที่มีชื่อว่า categories , tags เเละ postedBy
        // ทำการ ref ไปยัง categories , tags เเละ postedBy ด้วยคำสั่ง .populate() 
        // โดย parameter ค่าแรกที่ใส่เข้าไปจะเป็นฟิลด์ใน model ที่เราต้องการอ้างอิงถึง และค่าที่สองก็คือ select หรือก็คือการบอก mongoose ว่าเราต้องการฟิลด์ไหนบ้าง 
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        // select() คือ การเลือก Collections ของ blog model ที่ไม่ได้อ้างอิงไปยัง model อื่น 
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                })
            }
            res.json(data)
        })
}

exports.listAllBlogsCategoriesTags = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10
    let skip = req.body.skip ? parseInt(req.body.skip) : 0

    let blogs
    let categories
    let tags

    Blog.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username profile')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: 'errorHandler(err)'
                })
            }
            blogs = data // blogs
            // get all categories
            Category.find({}).exec((err, c) => {
                if (err) {
                    return res.json({
                        error: 'errorHandler(err)'
                    })
                }
                categories = c // categories
                // get all tags
                Tag.find({}).exec((err, t) => {
                    if (err) {
                        return res.json({
                            error: 'errorHandler(err)'
                        })
                    }
                    tags = t
                    // return all blogs categories tags
                    res.json({ blogs, categories, tags, size: blogs.length })
                })
            })
        })
}

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({ slug })
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: 'errorHandler(err)'
                })
            }
            res.json(data)
        })
}

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.json({
                error: 'errorHandler(err)'
            })
        }
        res.json({
            message: 'Blog deleted successfully'
        })
    })
}

exports.update = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Blog.findOne({ slug }).exec((err, oldBlog) => {
        if (err) {
            return res.status(400).json({
                error: 'errorHandler(err)'
            })
        }

        let form = new formidable.IncomingForm()
        form.keepExtensions = true

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                })
            }

            let slugBeforeMerge = oldBlog.slug
            oldBlog = _.merge(oldBlog, fields)
            oldBlog.slug = slugBeforeMerge

            const { body, desc, categories, tags } = fields

            if (body) {
                oldBlog.excerpt = smartTrim(body, 320, ' ', ' ...')
                oldBlog.desc = stripHtml(body.substring(0, 160))
            }

            if (categories) {
                oldBlog.categories = categories.split(',')
            }

            if (tags) {
                oldBlog.tags = tags.split(',')
            }

            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1mb in size'
                    })
                }
                oldBlog.photo.data = fs.readFileSync(files.photo.path)
                oldBlog.photo.contentType = files.photo.type
            }

            oldBlog.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: 'errorHandler(err)'
                    })
                }
                // result.photo = undefined
                res.json(result)
            })
        })
    })
}

exports.photo = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({ slug })
        .select('photo')
        .exec((err, blog) => {
            if (err || !blog) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.set('Content-Type', blog.photo.contentType)
            return res.send(blog.photo.data)
        })
}

// Relate โดยอ้างอิงจาก category
exports.listRelated = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 3
    const { _id, categories } = req.body.blog
    // $ne ย่อมาจาก not including(ไม่รวม)
    // หมายความว่า ค้นหา blog ที่ category เหมือนกันโดยไม่รวม blog ตัวเอง
    // $in ย่อมาจาก including(รวม)
    // หมายความว่า ค้นหา categories ที่เหมือนกับ blog นี้
    Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
    .limit(limit)
    .populate('postedBy', '_id name username profile')
        .select('title slug excerpt postedBy createdAt updatedAt')
        .exec((err, blogs) => {
            if (err) {
                return res.status(400).json({
                    error: 'Blogs not found'
                })
            }
            res.json(blogs)
        })
}