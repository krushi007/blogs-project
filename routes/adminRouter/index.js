const express = require('express')

const routes = express.Router()

const admin = require('../../models/adminModels')

const adminCon = require('../../controller/adminController/adminCon')

const passport = require('passport')
const { route } = require('../sliderRouter/index')

routes.get('/',adminCon.loginForm)

routes.get('/dashboard',passport.checkAuthenticatedUser,adminCon.dashboard)

routes.get('/addAdmin',passport.checkAuthenticatedUser,adminCon.addAdmin)

routes.post('/insertData',passport.checkAuthenticatedUser,admin.uploadedAvtar,adminCon.insertData)

routes.post('/checkData',passport.authenticate('local', { failureRedirect: "/" }),adminCon.checkData)

routes.get('/viewRecord',passport.checkAuthenticatedUser,adminCon.viewRecord)

routes.get('/profile',adminCon.profile)

routes.use('/addSlider',passport.checkAuthenticatedUser,require('../sliderRouter/index'))

routes.get('/active/:id',adminCon.active)

routes.get('/deactive/:id',adminCon.deactive)

routes.get('/forgotPass',adminCon.forgotPass)

routes.post('/checkMail',adminCon.checkMail)

routes.get('/otp',adminCon.otp)

routes.post('/checkOtp',adminCon.checkOtp)

routes.get('/changePass',adminCon.changePass)

routes.post('/updatePass',adminCon.updatePass)

routes.use('/addBlogs',passport.checkAuthenticatedUser,require('./blogsRoute'))

routes.get('/viewComment',adminCon.viewComment)

module.exports =  routes