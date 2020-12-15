
let EventEmitter = require('events')
let fs = require('fs')
class ReadStream extends EventEmitter {
  constructor(path,  options = {}){
    super()
    // 1. 默认值
    this.path = path
    this.flags = options.flags || 'r'
    this.encoding = options.encoding || null
    this.autoClose = options.autoClose || 'r'
    this.start = options.start || 0
    this.end = options.end || undefined
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.offset= 0 ;
    this.flowing = false; // 表示默认不是流动模式

    // 2.open方法  打开文件
    this.open()

    this.on('newListener', (type)=>{
      if(type == 'data'){
        this.flowing = true // 流动模式
        this._read()
      }
    })
  }
  // 结合上传流得操作
  pipe (ws){
    this.on('data', (chunk)=>{
      let r = ws.write(chunk)
      if(!r){
        this.pause()
      }
    })
    this.on('end',()=>{
      // ws.end()
    })
    ws.on('drain',()=>{
      this.resume()
    })
  }

  _read (){
    if (typeof this.fd != 'number'){
      // 第一次获取不到fd 所以给一个open事件 等emit open事件时就删除
      return this.once('open', ()=>{this._read})
    }
    // end是索引 highwatermark 是数量
    let howMouchToRead = this.end? Math.min(this.highWaterMark, this.end - this.offset+1) : this.highWaterMark
    let buffer = Buffer.alloc(howMouchToRead); // 每次读取的个数
    fs.read(this.fd, buffer, 0, howMouchToRead,this.offset,function (err,bytesRead) {
        console.log('bytesRead',bytesRead)
      if (err)return this.destory(err)
      if (bytesRead > 0) {
        this.emit('data', buffer.slice(0,bytesRead))
        this.offset += bytesRead
        if(this.flowing){ // 如果是流动模式就继续下一轮得读取
          this._read()
        }
      }else {
        this.emit('end');// 文件读取完毕后才触发
        this.destroy();// 触发close事件
      }
    })
  }
  pause(){
    this.flowing = false
  }
  resume(){
    if(!this.flowing){ // 恢复成流动模式
      this.flowing = true
      this._read()
    }
  }
  destory (err){
    if(err){
      this.emit('error',err)
    }
    if(typeof this.fd == 'number') {
      fs.close(this.fd, ()=>{
        this.emit('close')
      })
    }
  }
  open(){
    fs.open(this.path,this.flags,(err,fd)=> {
      if (err){
        return this.destory(err)
      }
      this.fd = fd 
      this.emit('open', fd) // 使用events通知open触发 传入读取到的内容
    })
  }
}

module.exports = ReadStream






