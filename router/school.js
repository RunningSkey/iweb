/**
 * 校区模块
 */

const express = require('express')

const pool = require('../pool')	

let router = express.Router()  /* 创建路由器 */

module.exports = router

router.get('/list',(req,res)=>{
	res.send('11')
})