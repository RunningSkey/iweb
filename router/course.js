
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