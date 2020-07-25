/**
 * 校区模块
 */

const express = require('express')

const pool = require('../pool')	

let router = express.Router()  /* 创建路由器 */


router.get('/list',(req,res,next)=>{
	let sql = 'SELECT sid,sname,address,phone,postcode FROM school'
	pool.query(sql,(err,result)=>{
		if(err){
			next(err) /**发生错误执行后置中间件{express 自带一个后置中间件} */
			return
		} 
		res.send(result)
	})
})

router.get('/course', (req,res,next)=>{

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
		let sql = 'SELECT cid,pic,cLength,startTime,price FROM course WHERE cid IN (SELECT courseId FROM schoolCourse WHERE schoolId=?)'
		pool.query(sql,sid,(err,result)=>{
			if(err){
				next(err)
				return
			}
			output.courseList = result
			res.send(output)
		})
	})

	
})


/**
 * 导出路由器
 */
module.exports = router