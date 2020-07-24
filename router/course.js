/**
 * 校区模块，包含如下功能点：
 *	1.1校区列表功能点
 *	1.2校区开课功能点
 */
const express = require('express')
const pool = require('../pool')
let router = express.Router()    //创建路由器
module.exports = router

/**
 * 1.1校区列表功能点
 * 请求方法：
 * 	GET
 * 请求URL：
 * 	/course/list
 * 请求参数：
 * 	无
 *
 */
router.get('/list', (req,res,next)=>{

	let sid = req.query.sid
	if(!sid){
		let output = {
			code: 400,
			msg: 'sid required'
		}
		res.send(output)
		return
	}
	
	let output = {
		school: {},
		courseList: []
	}

	let sql = 'SELECT sid,sname,address FROM school WHERE sid=?'
	pool.query(sql,sid,(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length == 0){
			res.send(output)
			return
		}
		output.school = result[0]
		let sql = ''
		res.send(output)
	})

	
})