const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs").promises;
const chalk = require("chalk");
const ejs = require("ejs"); // 实现原理同级目录

const os = require("os");
const net = os.networkInterfaces();
const { createReadStream, createWriteStream, readFileSync } = require("fs");

const mime = require("mime");

class Server {
  constructor(options) {
    this.port = options.port;
    this.directory = options.directory;
    this.cache = options.cache;
  }
  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url);
    pathname = decodeURIComponent(pathname);

    // directory 当前启动位置目录 加上用户传入的目录
    let requestUrl = path.join(this.directory, pathname);
    console.log(requestUrl, "requestUrl");
    try {
      const objStat = await fs.stat(requestUrl);
      if (objStat.isDirectory()) {
        let dirs = await fs.readdir(requestUrl);
        let content = await ejs.renderFile(
          path.resolve(__dirname, "template.html"),
          {
            dirs: dirs.map((dir) => ({
              name: dir,
              pathname: path.join(pathname, dir), //当前的pathname 加上需要跳转路径
            })),
          }
        ); // 返回显示的内容 html
        res.setHeader("Content-type", "text/html;charset=utf-8");
        console.log(dirs, "dirs");
        res.end(content);
      } else {
        console.log("file");
        this.sendFile(requestUrl, req, res, objStat);
      }
    } catch (error) {}
  }
  cacheFile(filePath, req, res, stat) {
        res.setHeader('Cache-Control', 'max-age=10');
        const LastModified = stat.ctime.toUTCString() // 文件创建时间
        // 利用文件内容生成md5值 （当前文件小可以这样，大文件就不行了，可以采用行数创建时间） 
        const Etag = crypto.createHash('md5').update(readFileSync(filePath)).digest('base64');
        res.setHeader('Last-Modified', LastModified)
        res.setHeader('Etag', Etag)
        let ifModifiedSince = req.headers['if-modified-since'];
        let ifNoneMatch = req.headers['if-none-match'];
        // 如果自身的标识与浏览器带过来的一样 那么返回304告诉浏览器走缓存
        // 如果不一样那么读文件给浏览器
        if (LastModified !== ifModifiedSince || Etag !== ifNoneMatch){
            return false
        }
        return true
        
    }
  sendFile(filePath, req, res, stat) {
    // sendFile中可以设置缓存
    if (this.cacheFile(filePath, req, res, stat)) {
      res.statusCode = 304;
      return res.end();
    }

    res.setHeader("content-Type", mime.getType(filePath) + ";charset=utf-8");
    createReadStream(filePath).pipe(res); // 读取文件 返回response
  }
  start() {
    // http.createServer 中回调的this会被修改 所以需要修改this指向
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.port, () => {
      console.log(
        `${chalk.yellow(
          "Starting up http-server, serving ./"
        )} \n${chalk.yellow("Available on:")} \n ${
          net["以太网"][1].address
        }:${chalk.green(this.port)}`
      );
      console.log(` 127.0.0.1:${chalk.green(this.port)}`);
    });
  }
}

module.exports = Server;
