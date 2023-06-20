const slider = require('../../models/sliderModels')

const blogs = require('../../models/blogsModels')

const comment = require('../../models/commentModels')

module.exports.user = async (req,res) =>{

    var sliderData = await slider.find({})
    var blogsData = await blogs.find({})

    if(sliderData && blogsData){
        return res.render('user/userDashboard',{
            'sliderRecord' : sliderData,
            'blogsRecord' : blogsData,
        })
    }
    else{
        return res.redirect('/user')
    }
} 

module.exports.blogs_single = async (req,res) =>{
    // console.log(req.params.id);
    let allComment = await comment.find({blogId:req.params.id,isActive: true}).populate('blogId').exec();
    let commentCount = await comment.find({blogId:req.params.id,isActive: true}).countDocuments();
    
    let response = await blogs.findById(req.params.id);
    let lastRecord = await blogs.find({}).sort({_id : -1}).limit(2)

    let allBlogs = await blogs.find({isActive : true}) 

    var blogId = []
    for(var i=0; i<allBlogs.length; i++)
    {
        blogId.push(allBlogs[i].id)
    }

    var next;
    for(var i=0; i<blogId.length; i++)
    {
        if(req.params.id == blogId[i])
        {
            next = i
        }
    }

    if(response){
        return res.render('user/blogs_single',{
            'blogsData' : response,
            'allComment' : allComment,
            'commentCout' : commentCount,
            'lastRecord' : lastRecord,
            'next' : next,
            'allBlogs' : blogId
        })
    }
    else{
        return res.redirect('back')
    }
}



module.exports.addComment = async (req,res)=>{
    // console.log(req.file);
    // console.log(req.body);

    let imagePath = '';
    if(req.file)
    {
        imagePath=comment.avatarPath+'/'+req.file.filename
    }
    req.body.coImage = imagePath;

    let commentData = await comment.create(req.body);
    if(commentData)
    {
        return res.redirect('back')
    }
    else{
        return res.redirect('back')
    }
}
