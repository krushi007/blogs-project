const express = require('express')
const { route } = require('../sliderRouter')
const Blog = require('../../models/blogsModels');

const routes = express.Router()

const blogsCon = require('../../controller/adminController/blogsCon')

routes.get('/',blogsCon.addBlogs)

routes.post('/insertBlogs',Blog.uploadedAvatar,blogsCon.insertBlogs)

module.exports = routes