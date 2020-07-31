const express = require('express')
let router = express.Router()    //创建路由器
module.exports = router

const random = require('../util/random')

const svgCaptcha = require('svg-captcha')
router.get('/register',(req,res)=>{

  let options = {
    width: 100,
    heigt: 30,
    fontSize: 40,
    charPreset: '1234567890',  //预设字符
    size: 5,
    ignoreChars: '0oO1lI2Zz',
    noise: 5,
    color: true,
    background: random.randColor(180,240)
  }

  let captcha = svgCaptcha.create(options)

  req.session.captchaRegister = captcha.text

  res.type('svg')
  res.send(captcha.data)
})