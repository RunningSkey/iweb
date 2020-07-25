const express = require('express')
let router = express.Router()    //创建路由器
module.exports = router
const svgCaptcha = require('svg-captcha')
router.get('/register',(req,res)=>{
  let captha = svgCaptcha.create({
    width: 100,
    height: 30,
    size: 5,
    ignoreChars: '0oO1lI2Zz',
    noise: 4
  })

  req.session.capthaRegister = captha.text

  res.type('svg')
  res.send(captha.data)
})