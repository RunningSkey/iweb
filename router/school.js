/**
 * 校区模块
 */

const express = require('express')

const pool = require('../pool')	

let router = express.Router()  /* 创建路由器 */


router.get('/list',(req,res)=>{

	let sql = 'SELECT sid,sname,address,phone,postcode FROM school'
	pool.query(sql,(err,result)=>{
		if(err) throw err
		res.send(result)
	})
})

/**
 * 导出路由器
 */
module.exports = router