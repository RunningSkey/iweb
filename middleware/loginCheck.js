/**
 * 登录检查中间件
 * 
 */

 module.exports = function(req,res,next){
  if(!req.session || !req.session.userInfo){
    let output = {
      code: 490,
      msg: 'login required'
    }
    res.send(output)
    return
  }
  next()  //如果登录，继续执行后续的中间件或路由
 }