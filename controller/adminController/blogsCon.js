const blogs = require('../../models/blogsModels')

module.exports.addBlogs = async (req,res) =>{
    return res.render('admin/addBlogs')
}

module.exports.insertBlogs = async (req,res) =>{
    console.log(req.file);
    console.log(req.body);

    let imagePath = ''

    if(req.file)
    {
        imagePath = blogs.avtarPath + "/" + req.file.filename
        req.body.blogsImage = imagePath
    } 

    let blogsData = await blogs.create(req.body)
    if(blogsData)
    {
        return res.redirect('back')
    }
    else{
        return res.redirect('back')
    }
}



