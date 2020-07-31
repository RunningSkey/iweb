/**
 * 随机数生成模块
 */

 module.exports = {
   /**
    * 返回指定范围内的随机数
    */
   randNum(min,max){
    let n = Math.random()
    n = n * (max-min)
    n += min
    n = Math.floor(n)
    return n
   }, 

   /**
    * 返回随机颜色值，例如 #a4d81b
    */
   randColor(min,max){
    let red = this.randNum(min,max)
    red = red.toString(16) //转16进制
    // 保障颜色值始终为两位
    red = red.length < 2 ? '0'+ red : red 

    let green = this.randNum(min,max)
    green = green.toString(16)
    green = green.length < 2 ? '0'+ green : green
    
    let blue = this.randNum(min,max)
    blue = blue.toString(16)
    blue = blue.length < 2 ? '0'+ blue : blue

    return '#' + red + green + blue
   },

   /**
    * 返回随机文件名
    */
   randFileName(oldName){
    let f = Date.now() //时间戳
    f = String(f)
    f += this.randNum(100000,1000000) //六位随机数
    f += oldName.substring(oldName.lastIndexOf('.')) //原文件的后缀名
    return f
   }
 }