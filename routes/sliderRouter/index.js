const express = require('express')

const routes = express.Router()

const sliderCon = require('../../controller/sliderController/sliderCon')

const slider = require('../../models/sliderModels')

routes.get('/',sliderCon.addSlider)

routes.post('/insertSlider',slider.uploadedAvtar,sliderCon.insertSlider)

module.exports = routes