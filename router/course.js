
const express = require('express')
const pool = require('../pool')
let router = express.Router()    //创建路由器
module.exports = router


router.get('/list', (req,res,next)=>{
	
	let typeId = req.query.typeId
	if(!typeId){
		typeId = 0
	}else{
		typeId = parseInt(typeId)
	}

	let pageNum = req.query.pageNum
	if(!pageNum){
		pageNum = 1
	}else{
		pageNum = parseInt(pageNum)
	}
	
	let output = {
		totalCount: 0,
		pageSize: 6,
		pageCount: 0,
		pageNum: pageNum,
		courseList: []
	}

	let condition = ''
	let placeholder = []
	let sql = 'SELECT COUNT(*) AS c FROM course WHERE 1 '
	
	if(typeId>0){
		sql += 'AND typeId=? '
		placeholder.push(typeId)
	}
	pool.query(sql,placeholder,(err,result)=>{
		if(err){
			next(err)
			return
		}
		output.totalCount = result[0].c
		output.pageCount = Math.ceil(output.totalCount/output.pageSize)

		let sql = 'SELECT cid,pic,title,cLength,startTime,price,tid,tname FROM course,teacher WHERE course.teacherId=teacher.tid '
		let placeholder = []
		if(typeId>0){
			sql += 'AND typeId=? '
			placeholder.push(typeId)
		}
		sql += ' ORDER BY cid DESC LIMIT ?, ? '
		placeholder.push((output.pageNum-1)*output.pageSize)
		placeholder.push(output.pageSize)

		pool.query(sql,placeholder,(err,result)=>{
			if(err){
				next(err)
				return
			}
			output.courseList = result
			res.send(output)
		})
	})
})

router.get('/detail',(req,res,next)=>{
	let cid = req.query.cid
	if(!cid){
		let output = {
			code: 400,
			msg: 'cid required'
		}
		res.send(output)
		return
	}
	let sql = 'SELECT cid,typeId,title,cLength,startTime,pic,price,details,tid,tname,tpic FROM course,teacher WHERE course.teacherId=teacher.tid AND cid=?'
	pool.query(sql,cid,(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length == 0){
			res.send({})
			return
		}
		let output = result[0]

		let sql = 'SELECT sid,sname FROM school WHERE sid IN (SELECT schoolId FROM schoolCourse WHERE courseId=?)'
		pool.query(sql,cid,(err,result)=>{
			if(err){
				next(err)
				return
			}
			output.schoolList = result[0]
			res.send(output)
		})
	})
})

/**
 * 3.3最新课程功能点
 * 请求方法：
 * 	GET
 * 请求URL：
 * 	/course/newest
 * 请求参数：
 * 	count	  可选		需要返回的最新课程的数量，默认值为4
 * 返回消息：
 * 	[
		{
			"cid": 12,
			"title": "12HTML零基础入门",
			"pic": "img-course/01.png",
			"price": 399,
			"tname": "纪盈鑫"
		}，
		.......
	]
 */
router.get('/newest', (req, res, next)=>{
	//1.读取请求数据
	let count = req.query.count
	if(!count){
		count = 4
	}else {	  //查询字符串中提交的数据都是string，但是SQL中的LIMIT后面必需是int
		count = parseInt(count)
	}
	//2.执行查询语句
	let sql = 'SELECT cid,title,pic,price,tname FROM course,teacher WHERE course.teacherId=teacher.tid  ORDER  BY  cid  DESC  LIMIT  ?' 
	pool.query(sql, count, (err, result)=>{
		if(err){
			next(err)
			return
		}
		//3.发送响应消息
		res.send(result)
	})
})


/**
 * 3.4热门课程功能点
 * 请求方法：
 * 	GET
 * 请求URL：
 * 	/course/hottest
 * 请求参数：
 * 	count	  可选		需要返回的热门课程的数量，默认值为4
 * 返回消息：
 * 	[
		{
			"cid": 12,
			"title": "12HTML零基础入门",
			"pic": "img-course/01.png",
			"price": 399,
			"tname": "纪盈鑫"
		}，
		.......
	]
 */
router.get('/hottest', (req, res, next)=>{
	//1.读取请求数据
	let count = req.query.count
	if(!count){
		count = 4
	}else {	  //查询字符串中提交的数据都是string，但是SQL中的LIMIT后面必需是int
		count = parseInt(count)
	}
	//2.执行查询语句
	let sql = 'SELECT cid,title,pic,price,tname FROM course,teacher WHERE course.teacherId=teacher.tid  ORDER  BY  buyCount  DESC  LIMIT  ?' 
	pool.query(sql, count, (err, result)=>{
		if(err){
			next(err)
			return
		}
		//3.发送响应消息
		res.send(result)
	})
})
