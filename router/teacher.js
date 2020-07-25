
const express = require('express')
const pool = require('../pool')
let router = express.Router()    //创建路由器
module.exports = router


router.get('/list', (req,res,next)=>{

	let sql = 'SELECT tid,tname,tpic,maincourse,style FROM teacher'

	pool.query(sql,(err,result)=>{
		if(err){
			next(err)
			return
		}
		res.send(result)
	})

})

router.get('/detail',(req,res,next)=>{
	let tid = req.query.tid
	if(!tid){
		let output = {
			code: 400,
			msg: 'tid required'
		}
		res.send(output)
		return
	}

	let sql = 'SELECT tid,tname,tpic,maincourse,style,experience FROM teacher WHERE tid=?'

	pool.query(sql,tid,(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length === 0){
			res.send({})
			return
		}

		let output = result[0]

		let sql = 'SELECT cid,title,pic FROM course WHERE teacherId=?'
		pool.query(sql,tid,(err,result)=>{
			if(err){
				next(err)
				return
			}

			output.courseList = result
			res.send(output)

		})
	})
})