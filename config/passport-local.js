const passport = require('passport')

const passportLocal = require('passport-local').Strategy

const Admin = require('../models/adminModels')

passport.use(new passportLocal({
    usernameField : "email"
},async function(email,password,done){
    let adminData = await Admin.findOne({email:email})
    if(!adminData || adminData.password != password)
    {
        return done(null,false)
    }
    return done(null,adminData)
}))

passport.serializeUser(function(adminData,done){
    return done(null, adminData.id)
})

passport.deserializeUser(async function(id, done){
    let admin = await Admin.findById(id)

    if(admin)
    {
        return done(null,admin)
    }
    else{
        return done(null,false)
    }
})

passport.checkAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated())
    {
        next();
    }
    else{
        return res.redirect('/')
    }
}

passport.showData = (req,res,next) =>{
    if(req.isAuthenticated)
    {
        res.locals.admin = req.user
    }
    next()
}

module.exports = passport