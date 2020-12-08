
// 文件可读流是基于stream模块中Readable接口
const { log } = require('console')
const fs = require('fs')
const path = require('path')

// ReadStream 将fs.open fs.read fs.close 封装成一个
let rs = fs.createReadStream(path.resolve(__dirname, '2.txt'), {
    flags: 'r', // 文件标识
    encoding: null, // 默认编码null 
    // fd: number, // 文件描述符 
    // mode: 0o666, // 八进制表现权限 给当前用户用户组得权限 // d (rwx) (r-x) (r-x) rwx分别是4 2 1 777最高权限 66就是代表能读能写
    autoClose: false, // 读完之后是否关闭
    // emitClose: boolean, // 
    start: 0, // 从索引开始
    end: 100, // 哪个索引结束
    highWaterMark: 3 // 控制流速 每次读取几个字节
})

rs.on('open',function (fd) {
  console.log(fd)
})
let arr = []
rs.on('data', function (chunk) { // 当用户监听data  内部会不停向data中传递数据
  arr.push(chunk) // 把所有的buffer 存起来
})

rs.on('end', function () { // 读取完毕触发事件
  let r = Buffer.concat(arr) // 拼接buffer
  log(r)
})
rs.on('close',function () { // close 事件需要等待读取完毕触发
  console.log('close')
})


// 文件流跟流不是同一概念 文件流是流的一种 只有文件流才有open,close方法
// on('data') on('close') 都是流中的方法 可读流的标志就是有data和close方法

// 可读流 可写流 双工流 转化流 

// 文件基于可读流来实现文件流  文件可读流是基于流自己实现的流 重写_read
