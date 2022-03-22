// 服务端主要的功能是要不要使用缓存

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const mime = require("mime");

// last-modified（文件修改时间） 服务端设置缓存标识  浏览器下次访问会携带if-modified-since 给服务端
// Etag (文件的标识) 服务端将对应文件生成对应md5值  浏览器下次会携带if-none-match给服务端
// Etag 生成文件标识 可以整个文件最准确但是慢 或者文件名+文件行数 等
// 两个一起用是因为：单个文件修改时间 时间不精准 文件修改后又改回来 实际内容没变 cdn放置不同地方时区问题

// 强缓存与协商缓存一起使用 
// 强缓存失效 走协商缓存 协商缓存时服务端再次告诉浏览器走强缓存 如此反复
const Server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url); // 获取请求路径

  // 设置强缓存时间
  // res.setHeader('Cache-Control', 'max-age=30')
  // 访问后 到几点别找我了 针对老版本浏览器 上面的那个时间权重更高
  // res.setHeader('Expires',new Date(Date.now() + 30*1000).toUTCString());

  // 每次都会发送请求到服务器 服务器通过状态码告诉客户端是否走缓存
  // res.setHeader('Cache-Control', 'no-cache')
  // 不缓存 浏览器不缓存文件
  // res.setHeader('Cache-Control', 'no-store')
  let filePath = path.join(__dirname, pathname);
  console.log(filePath);
  fs.stat(filePath, function (err, statObject) {
    if (err) {
      res.statusCode = 404;
      res.end("Not Found");
    } else {
      if (!statObject.isFile()) {
      } else {
        res.setHeader(
          "Content-Type",
          `${mime.getType(filePath)};charset=utf-8`
        );
        fs.createReadStream(filePath).pipe(res);
        // res.end();
      }
    }
  });
});

Server.listen(8888, function () {
  console.log("服务器创建成功");
});
