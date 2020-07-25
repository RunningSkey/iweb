/**
 * 服务器端入口文件
 */
//1 创建并启动web服务器
const express = require('express');

let port = 5050;/* 端口 */
let app = express();
app.listen(port)

//2 创建前置中间件 解析post请求体
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//使用session处理中间件：①为当前客户端分配session存储空间，并告知客户端sid ②当前客户端再次请求时从请求头部读取sid，进而找到该客户端对应的session空间，保存为req.session对象
let session = require('express-session')
app.use(session({
	secret: 'tedu123',	//自定义生成sid随机数的种子
	saveUninitialized: true,	//是否保存未经初始化过的session数据
	resave: true,	//是否自动保存session数据——即使没有修改过
}))

//3 声明路由和路由器
const schoolRouter = require('./router/school')
app.use('/school', schoolRouter)

const teacherRouter = require('./router/teacher')
app.use('/teacher', teacherRouter)

const courseRouter = require('./router/course')
app.use('/course', courseRouter)

const userRouter = require('./router/user')
app.use('/user', userRouter)

//检查是否登录 才能继续执行
const loginCheckMiddleware = require('./middleware/loginCheck')
app.use('/favorite',loginCheckMiddleware)
const favoriteRouter = require('./router/favorite')
app.use('/favorite', favoriteRouter)


//检查是否登录 才能继续执行
app.use('/cart',loginCheckMiddleware)
const cartRouter = require('./router/cart')
app.use('/cart', cartRouter)


const systemRouter = require('./router/system')
app.use('/system', systemRouter)

// 验证码路由
const captcha = require('./router/captcha')
app.use('/captcha',captcha)


//4 创建后置中间件
/**
 * 如果不自定义  express 自带一个 发送 空字符串到客户端
 * 
 * 自定义错误中间件
 */
app.use((err,req,res,next)=>{
	res.status(500)
	res.send({
		code: 500,
		msg: 'Sorry！Server tmp error！Please retry later！',
		err: err
	})
})