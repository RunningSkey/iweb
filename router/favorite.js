/**
 * 收藏夹模块
 */

const express = require('express')
const pool = require('../pool')
let router = express.Router()    //创建路由器
module.exports = router


router.post('/add',(req,res,next)=>{
  // if(!req.session || !req.session.userInfo){
  //   let output = {
  //     code: 490,
  //     msg: 'login required'
  //   }
  //   res.send(output)
  //   return
  // }
  // 此处的登录检查由longinCheck中间件 检查

  let uid = req.session.userInfo.uid
  let cid = req.body.cid
  if(!cid){
    let output = {
      code: 400,
      msg: 'cid required'
    }
    res.send(output)
    return
  }

  // let fTime = new Date().getTime()
  let fTime =  Date.now()

  let sql = 'SELECT fid FROM favorite WHERE userId=? AND courseId=?'
  pool.query(sql,[uid,cid],(err,result)=>{
    if(err){
      next(err)
      return
    }
    if(result.length>0){
      let sql = 'UPDATE favorite SET fTime=? WHERE fid=?'
      pool.query(sql,[fTime,result[0].fid],(err,result)=>{
        if(err){
          next(err)
          return
        }
        let output = {
          code: 201,
          msg: 'favorite time update'
        }
        res.send(output)
      })
    }else{
      let sql = 'INSERT INTO favorite VALUES(NULL,?,?,?)'
      pool.query(sql,[uid,cid,fTime],(err,result)=>{
        if(err){
          next(err)
          return
        }
        let output = {
          code: 200,
          msg: 'favorite add succ',
          fid: result.insertId
        }
        res.send(output)
      })
    }
  })
})

router.get('/list',(req,res,next)=>{
  let uid = req.session.userInfo.uid

  let sql = 'SELECT fid,fTime,courseId,title,price,pic FROM favorite,course WHERE course.cid=favorite.courseId AND userId=? ORDER BY fTime DESC'

  pool.query(sql,uid,(err,result)=>{
    if(err){
      next(err)
      return
    }
    res.send(result)
  })
})