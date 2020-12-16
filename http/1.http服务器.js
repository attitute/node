const http = require('http')
const url = require('url')

const server = http.createServer((req,res)=>{
  console.log(req.method, 'res')
  let {name, age} = url.parse(req.url,true).query // url可以解析浏览器传输过来的参数 true表示query变成一个对象形式
  console.log(name, age, 'req.url')
  console.log(req.headers) // 都是小写的 key - value都是小写的

  // req是一个可读流
  let arr = []
  req.on('data', function (chunk) {
    console.log(chunk, 'chunk')
    arr.push(chunk)
  })
  req.on('end',function () {
    console.log(Buffer.concat(arr))
  })
  
  // res是一个可写流
  // 响应部分
  res.statusCode = 200 // 响应码
  res.statusMessage = 'false' // 响应信息

  // 响应头
  res.setHeader('Auth', 'xxx')
  res.setHeader('Content-Type','text/html;charset=utf-8')

  // 响应体
  res.write('hello');
  res.end('你好');

  
  // if(pathname == '/sum'){ // node适合I/O fs模块里面的  会阻塞
  //     let sum = 0;  // 子进程 进行ipc通信 来实现
  //     for(let i = 0; i < 10000000000;i++){
  //         sum+=i;
  //     }
  //     res.end(sum + '');
  // }else{
  //     res.end('ok')
  // }

})
let port = 8888
server.listen(port,()=>{
  console.log('server：'+ port)
})
server.on('error', (err)=>{ // 错误处理
  console.log(err)
  if(err.errno = 'EADDRINUSE'){ // 端口冲突
    server.listen(++port) 
  }
})



// node自动重启的功能 
// supervisor (nodemon) (pm2)