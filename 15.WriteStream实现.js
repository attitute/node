
// 思路
// 1.继承events模块的 发布订阅功能
// 2.方法的初始化 默认值
// 3.初始化方法就会先打开文件
// 4.写相应方法

const EventEmitter = require('events')
const fs = require('fs')
class WriteStream extends EventEmitter {
  constructor(path, options = {}){
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.encoding = options.encoding || 'utf8'
    this.mode = options.mode || 0o666
    this.emitClose = options.emitClose || true
    this.start = options.start || 0
    this.highWaterMark = options.highWaterMark || 16*1024 // 默认16k

    this.len = 0 // 写入的个数
    this.needDrain = false // 默认不触发drain
    this.cache = [] // 写入操作数组
    this.writting = false // 默认不在写入状态
    this.offset = 0 // 写入到文件中的位置

    this.open()
  }
  destory(err){
    if(err){
      this.emit('err',err)
    }
  }
  clearBuffer(){
    // 清空缓存
    let data = this.cache.shift() // 每次取第一个缓存
    if(data){ // 缓存中有内容
      this._write(data.chunk,data.encoding, data.cb)
    } else {
      this.writting = false // 没有内容代表不在写入状态了
      if(this.needDrain){ // 需要drain 则触发
        this.needDrain = false
        this.emit('drain')
      }
    }

  }
  // 打开文件
  open (){
    fs.open(this.path,this.flags,this.mode, (err,fd)=>{
      if(err){
        return this.destory(err)
      }
      this.fd = fd
      this.emit('open', fd)
    })
  }

  write(chunk,encoding = this.encoding,cb = ()=>{}){
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk) // 格式化chunk
    this.len += chunk.length // 存储写入的长度 字节
    let result = this.len < this.highWaterMark // 比较写入长度与期望值
    this.needDrain = !this.result // 超过期望着则触发drain

    const clearBuffer = ()=>{ // 保存每次写入回调 等待写入操作完毕触发
      this.clearBuffer() // 清空缓存
      cb() // 用户的回调
    }
    if (this.writting){ // 如果是写入状态就存入数组 等待执行
      // 将写入的内容缓存起来
      this.cache.push({
        chunk,
        encoding,
        clearBuffer
      })
    }else { // 不是写入状态就直接触发
      this.writting = true
      this._write(chunk,encoding,clearBuffer)
    }
    return result // 返回结果是否超过期望值
  }
  _write(chunk, encoding, cb){
    // 绑定事件监听open 用于第一次open操作异步 所以拿不到fd得情况
    if (!this.fd) {
      return this.once('open',()=>this._write(chunk,encoding,cb))
    }
    // 写入的文件 写入的内容 从内容中哪个开始写 写入多少 写入到文件中的位置 
    fs.write(fd, chunk, 0, chunk.length,this.offset, (err , bytesWrite)=>{
      this.offset += bytesWrite // 更改偏移量
      this.len -= bytesWrite // 写入个数减实际写入个数
      cb() // 写入完成触发回调
    })
  }
}


module.exports = WriteStream








