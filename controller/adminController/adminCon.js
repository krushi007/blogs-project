const admin = require('../../models/adminModels')

const comment = require('../../models/commentModels')

const nodemailer = require('nodemailer')

module.exports.dashboard = async (req, res) => {
    return res.render('admin/dashboard')
}

module.exports.addAdmin = async (req, res) => {
    return res.render('admin/add_admin')
}

module.exports.loginForm = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard')
    }
    else {
        return res.render('admin/loginForm')
    }
}

module.exports.profile = async (req, res) => {
    let accountData = req.user

    return res.render('admin/profile', {
        'profileData': accountData
    })

}

module.exports.insertData = async (req, res) => {
    console.log(req.file);
    console.log(req.body);

    req.body.name = req.body.fname + ' ' + req.body.lname

    var imagePath = ''

    if (req.file) {
        imagePath = admin.avtarPath + "/" + req.file.filename
        req.body.profile = imagePath
    }

    var data = await admin.create(req.body)

    if (data) {
        return res.redirect('/')
    }
    else {
        return res.redirect('/addAdmin')
    }

}

module.exports.checkData = async (req, res) => {
    req.flash('success', 'login successfully')
    return res.redirect('/dashboard')
}

module.exports.viewRecord = async (req, res) => {

    let search = ''
    if (req.query.search) {
        search = req.query.search
    }

    let page = 1

    if (req.query.page) {
        page = req.query.page
    }

    const limit = 2;

    let viewData = await admin.find({
        $or: [
            { 'name': { $regex: search, $options: 'i' } },

        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    let count = await admin.find({
        $or: [
            { 'name': { $regex: search, $options: 'i' } },

        ]
    }).countDocuments();

    if (viewData) {
        return res.render('admin/view_record', {
            'viewAllData': viewData,
            totalPage: Math.ceil(count / limit),
            searchData: search,
            currentPage: page
        })
    }
    else {
        return res.redirect('/viewRecord')
    }
}

module.exports.active = async (req,res) =>{
    let adminActive= await admin.findByIdAndUpdate(req.params.id, {isActive : false})

    let commentActive = await comment.findByIdAndUpdate(req.params.id, {isActive : false})

    if(adminActive && commentActive)
    {
        req.flash('success','user dectivate')
        return res.redirect('back')
    }
    else{
        return res.redirect('back')
    }
}

module.exports.deactive = async (req,res) =>{
    let adminDeactive = await admin.findByIdAndUpdate(req.params.id, {isActive : true})

    let commentDeactive = await comment.findByIdAndUpdate(req.params.id, {isActive : true})
    
    if(adminDeactive && commentDeactive)
    {
        req.flash('success','user activate')
        return res.redirect('back')
    }
    else{
        return res.redirect('back')
    }
}
 
module.exports.forgotPass = async (req,res) => {
    return res.render('admin/forgotPass')
}

module.exports.checkMail = async (req,res) => {
    console.log(req.body)
    let mail = await admin.findOne({email : req.body.email})

    if(mail){
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "64dc45a3d6b052",
              pass: "9f5924b32045f0"
            }
          });

          let otp = Math.ceil(Math.random()*10000)
          res.cookie('otp',otp)
          res.cookie('mail',mail.email)

          let info = await transporter.sendMail({
            from: 'texoso7535@meidecn.com', // sender address
            to: mail, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>${otp}</b>`, // html body
          });

          return res.redirect('/otp')
    }
    else{
        return res.redirect('back')
    }
}

module.exports.otp = async (req,res) =>{
    return res.render('admin/otp')
}

module.exports.changePass = async (req,res)=>{
    return res.render('admin/changePass')
}

module.exports.checkOtp = async (req,res)=>{
    if(req.body.otp == req.cookies.otp)
    {
        return res.redirect('/changePass')
    }
    else
    {
        return res.redirect('back')
    }
}

module.exports.updatePass = async (req,res) =>{
    if(req.body.npass == req.body.cpass)
    {
        let email = await admin.findOne({email : req.cookies.mail})
        if(email)
        {
            let data = await admin.findById(email.id)
            if(data)
            {
                let cp = await admin.findByIdAndUpdate(data.id,{password : req.body.npass})
                if(cp)
                {
                    return res.redirect('/')
                }
                else{
                    console.log('not updated');
                    return res.redirect('back')
                }
            }
            else{
                return res.redirect('back')
            }
        }
        else{
            return res.redirect('back')
        }
    }
    else{
        return res.redirect('back')
    }
}


module.exports.viewComment = async (req,res)=>{
    let commentData = await comment.find({}).populate('blogId').exec()
    
    if(commentData)
    {
        return res.render('admin/view_comment',{
            'commentRecord' : commentData
        })
    }
    else{
        return res.redirect('back')
    }
} 