const express = require('express')

const port = 8001

const path = require('path')

const app = express()

const db = require('./config/mongoose')
const passport = require('passport')
const passportLocal = require('./config/passport-local')

const cookieParser = require('cookie-parser')

const flash = require('connect-flash')
const customeMiddlewear = require('./config/middlewear')


const session = require('express-session')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded())

app.use(express.static('assets'))
app.use(express.static('userassets'))

app.use("/uploads",express.static(path.join(__dirname,'/uploads')))

app.use(cookieParser())

app.use(session({
    name : "pass",
    secret : 'codeAdmin',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 10000*60*60
    }

}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.showData)

app.use(flash())
app.use(customeMiddlewear.setFlash)

app.use('/',require('./routes/adminRouter/index'))

app.use('/user',require('./routes/userRouter/index'))

app.listen(port,(err)=>{
    if(err)
    {
        console.log('port is not running');
        return false
    }
    console.log('port is running on',port);
})