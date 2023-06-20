const mongoose = require('mongoose')

const AVTAR_PATH = '/uploads'

const multer = require('multer')

const path = require('path')

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    profile : {
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true,
        default : true,
    }

})

const imageStorage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,path.join(__dirname,'..',AVTAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

adminSchema.statics.uploadedAvtar = multer({storage : imageStorage}).single('profile')
adminSchema.statics.avtarPath = AVTAR_PATH

const admin = mongoose.model('admin',adminSchema)

module.exports = admin;