const slider = require('../../models/sliderModels')

module.exports.addSlider = async (req,res) =>{
    return res.render('admin/slider')
}

module.exports.insertSlider = async (req,res) =>{

    console.log(req.file);
    console.log(req.body);

    var imagePath = ''

    if(req.file)
    {
        imagePath = slider.avtarPath + "/" + req.file.filename
        req.body.image_slider = imagePath
    }

    let sliderData = await slider.create(req.body)

    if(sliderData)
    {
        return res.redirect('/addSlider')
    }
    else{
        console.log('data is not inserted');
        return res.redirect('/addSlider')
    }
}