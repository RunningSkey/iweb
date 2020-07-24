/**
 * 服务器端入口文件
 */
//1 创建并启动web服务器
const express = require('express');

let port = 5050;/* 端口 */
let app = express();
app.listen(port,()=>{
	console.log(port)
})

//2 创建前置中间件


//3 声明路由和路由器
const schoolRouter = require('./router/school')
app.use('/school', schoolRouter)

const teacherRouter = require('./router/teacher')
app.use('/teacher', teacherRouter)

const courseRouter = require('./router/course')
app.use('/course', courseRouter)

const userRouter = require('./router/user')
app.use('/user', userRouter)

const cartRouter = require('./router/cart')
app.use('/cart', cartRouter)

const systemRouter = require('./router/system')
app.use('/system', systemRouter)

//4 创建后置中间件