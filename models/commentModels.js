const mongoose = require('mongoose')

const AVTAR_PATH = '/uploads/comments'

const multer = require('multer')

const path = require('path')

const commentSchema = mongoose.Schema({

    coemail: {
        type: String,
        required: true
    },
    coname: {
        type: String,
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs'
    },
    codescription: {
        type: String,
        required: true
    },
    coImage: {
        type: String,
        required: true
    },
    isActive : {
        type : Boolean,
        required : true,
        default : true
    }
})

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVTAR_PATH))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

commentSchema.statics.uploadedAvatar = multer({ storage: imageStorage }).single('coImage')
commentSchema.statics.avatarPath = AVTAR_PATH

const comment = mongoose.model('comment', commentSchema)

module.exports = comment;