const mongoose = require('mongoose')

const AVTAR_PATH = '/uploads/blogs'

const multer = require('multer')

const path = require('path')

const blogsSchema = mongoose.Schema({

    username: {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    blogsImage : {
        type : String,
        required : true
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

blogsSchema.statics.uploadedAvatar = multer({storage : imageStorage}).single('blogsImage')
blogsSchema.statics.avtarPath = AVTAR_PATH

const blogs = mongoose.model('blogs',blogsSchema)

module.exports = blogs;