
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
        this._read()
      }
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
      if (err)return this.destory(err)
      if (bytesRead > 0) {
        this.emit('data', buffer.slice(0,bytesRead))
        this.offset += bytesRead
      }else {
        this.emit('end');// 文件读取完毕后才触发
        this.destroy();// 触发close事件
      }
    })
  }
  destory (err){
    if(err){
      this.emit('error',err)
    }
  }
  open(){
    fs.open(this.path,this.flags,function (err,fd) {
      if (err){
        return this.destory()
      }
      this.fd = fd 
      this.emit('open', fd) // 使用events通知open触发 传入读取到的内容
    })
  }
}






