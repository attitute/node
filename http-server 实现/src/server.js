
const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs').promises
const chalk = require('chalk')

const os = require('os')
const net = os.networkInterfaces()
const { createReadStream, createWriteStream} = require('fs')

const mime = require('mime')

class Server {
    constructor(options){
        this.port = options.port
        this.directory = options.directory
        this.cache = options.cache
    }
    async handleRequest(req,res){
        let {pathname} = url.parse(req.url)
        pathname = decodeURIComponent(pathname)

        // directory 当前启动位置目录 加上用户传入的目录
        let requestUrl = path.join(this.directory, pathname)
        console.log(requestUrl)
        try {
            const objStat = await fs.stat(requestUrl);
            if (objStat.isDirectory()){

            }else{
                console.log('requestUrl')
                this.sendFile(requestUrl, req, res, objStat)
            }
        } catch (error) {
            
        }
    }
    sendFile(filePath, req, res, stat){
        res.setHeader('content-Type', mime.getType(filePath)+';chartset=utf-8')
        createReadStream(filePath).pipe(res) // 读取文件 返回response
    }
    start(){
        // http.createServer 中回调的this会被修改 所以需要修改this指向
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.port, ()=>{
            console.log(`${chalk.yellow('Starting up http-server, serving ./')} \n${chalk.yellow('Available on:')} \n ${net['以太网'][1].address}:${chalk.green(this.port)}`)
            console.log(` 127.0.0.1:${chalk.green(this.port)}`)
        })
    }
}



module.exports = Server


