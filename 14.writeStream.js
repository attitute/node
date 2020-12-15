
const fs = require('fs')
const path = require('path')

// // 例1： 问题在于占用内存过多 写10个就用10个内存
// let ws = fs.createWriteStream(path.resolve(__dirname,'2.txt'),{
//   flags: 'w',
//   encoding: 'utf8',
//   emitClose: true,
//   mode: 0o666,
//   start: 0,
//   highWaterMark: 4 // 默认写入期望值 一般是16k（16*1024）期望值不会影响写入结果
// })

// // 异步代码会进行排序

// // 返回结果r 表示写入内容大小与期望值的关系  
// // 写入结果 小于 期望值为true  反之false
// let r = ws.write('ok','utf8', ()=>{
//   console.log('1')
// })

// let r1 = ws.write('ok','utf8', ()=>{
//   console.log('2')
// })


// 例2： 每写2次就消费 每两次一循环 一直到10次

const WriteWriteStream = require('./源码实现/15.WriteStream实现')


let ws1 = new WriteWriteStream(path.resolve(__dirname, '2.txt'), {
  flags: 'w',
  encoding: 'utf8',
  mode: 0o666,
  emitClose: true,
  start: 0,
  highWaterMark: 3
})
// let ws1 =  fs.createWriteStream(path.resolve(__dirname, '2.txt'), {
//   flags: 'w',
//   encoding: 'utf8',
//   mode: 0o666,
//   emitClose: true,
//   start: 0,
//   highWaterMark: 5
// })

let index = 0
function write() {
  let writting = true;
  while(index < 10) {
    writting = ws1.write(index++ +'') // write只能写入string或buffer
    if (!writting){ // 超过期望值就跳出循环
      break
    }
  }
  if (index == 10){
    // ws1.end('ok') // 触发 fs.close 和 write
    // 触发close之后不会触发drain
  }
}

ws1.on('drain',()=>{ // 当写入的个数达到或者超过期望值 被消费后 ，会触发drain事件
  console.log('drain');
  write()
})
ws1.on('close',()=>{ // ws关闭时触发
  console.log('close')
})

write()








