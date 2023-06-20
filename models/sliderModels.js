const mongoose = require('mongoose')

const AVTAR_PATH = '/uploads/slider'

const multer = require('multer')

const path = require('path')

const sliderSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    },
    image_slider : {
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

sliderSchema.statics.uploadedAvtar = multer({storage : imageStorage}).single('image_slider')
sliderSchema.statics.avtarPath = AVTAR_PATH

const slider = mongoose.model('slider',sliderSchema)

module.exports = slider;