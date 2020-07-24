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
app.use('/school',schoolRouter)

//4 创建后置中间件