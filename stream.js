const fs = require('fs')
const path = require('path')
let {Readable} = require('stream') // 可读流接口

// Readable 父类有一个read方法 
// 流 与 可读流

class MyReadStram extends Readable {
  _read(){
    let buffer = Buffer.alloc(3)
    fs.open(path.resolve(__dirname,'2.txt'),'r',(err, fd)=> {
      fs.read(fd,buffer,0,3,0,(err,bytesRead)=>{
        this.push(buffer) // 内部会触发emit('data',buffer) 将数据发射出来
        this.push(null)  // 此时如果push一个空值 会触发end事件 结束
      })
    })
  }
}

let myStream = new MyReadStram()
// 当用户监听了data事件后 会触发Readable.read方法，父类会调用子类自己的_read方法，
// 监听事件后就会不停的触发_read方法
myStream.on('data',(chunk)=>{
  console.log(chunk)
})
// 文件读取结束时触发
myStream.on('close',()=>{
  console.log("end")
})




