
const ReadStream = require('./源码实现/13.ReadStream实现')
const WriteStream = require('./源码实现/15.WriteStream实现')
const path = require('path');


const rs = new ReadStream(path.resolve(__dirname, '2.txt'), {
    highWaterMark: 4 // 64k
})

const ws = new WriteStream(path.resolve(__dirname, '3.txt'), {
    highWaterMark: 1 // 16k
})

// rs.on('data',function (chunk) {
//     console.log(chunk)
//     let r = ws.write(chunk)
//     if (!r){
//         rs.pause() // 写入就暂停
//     }
// })

// rs.on('end', function () {
//     // ws.end() // 关闭可写流
// })

// ws.on('drain',function(){ // 写入完毕继续
//     console.log('drain')
//     rs.resume()
// })




// 边读边写入  为了解决大文件读写操作
rs.pipe(ws); // 管道 on('data') on('end') ws.end（） ws.write()
// pipe 用处非常多 





