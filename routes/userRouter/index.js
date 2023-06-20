const express = require('express')

const routes = express.Router()

const passport = require('../../config/passport-local')

const userCon = require('../../controller/userController/userCon')

const comment = require('../../models/commentModels')

routes.get('/',userCon.user)

routes.get('/blogs_single/:id',userCon.blogs_single)

routes.post('/blogs_single/addComment',comment.uploadedAvatar,userCon.addComment)



module.exports = routes