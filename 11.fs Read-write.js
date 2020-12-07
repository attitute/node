
// file system 文件操作的api 同步api 异步api

// 文件的读写操作 
// 带有sync字样的都是同步api
// 读取的数据默认编码都是null， 二进制数据文件不存在报错
// 写入操作也是二进制的， 如果文件不存在就创建文件，如果存在那就覆盖

const fs = require('fs')
const path = require('path')
// fs.readFile 
// fs.writeFile 

// 开发时使用同步api(readFileSync...) 并不多 因为会阻塞 但是用起来方便


// 异步非阻塞 （读取小文件还好 64k以下算小文件 大文件就需要另外处理）
// 如果捕获错误 那就没问题 但是没捕获错误就会卡死
// js是单线程， 如果出错没有捕获 会终止运行
fs.readFile(path.resolve(__dirname, '2.txt'), function (err,data) {
    fs.writeFile(path.resolve(__dirname, '3.txt'), data, function (err){

    })
})

// 文件过大的问题 淹没可用内存（把可用内存占很多） 或者内存溢出 
// 文件过大处理方法  读取部分数据再进行写入

// fs.open (打开文件) fs.read (读文件) fs.write (写文件)



// fs.open fs.read  fs.write (自己定义读取位置)


const fs = require('fs')
const path = require('path')

let bufffer = Buffer.alloc(18)

// r(read) w(write) a(apend 追加内容) 
// r+ 以读取为基础要求文件必须存在 
// w+ 以写入为基础，文件不存在也可以操作
fs.open(path.resolve(__dirname,'2.txt'),'r', function (err, fd) {
    // 打开文件后的逻辑代码
    console.log('fd', fd)

    // fd 可以来描述我要对这个文件做什么操作
    // 文件描述符 读取到哪个buffer中，从buffer的哪个位置开始写入，写入几个，读取文件的位置是多少
    fs.read(fd,bufffer,0,18,0,function (err,bytesRead) {// bytesRead真实读取到的个数
        fs.open(path.resolve(__dirname,'3.txt'), 'w', function (err,wfd) {
            fs.write(wfd,bufffer,0,18,0, function (err, written) {
                fs.close(fd, ()=>{})
                fs.close(wfd, ()=>{})
            })
        })

    })
})


// 异步迭代采用递归实现 实现读取3个消费3个
let BUFFER_SIZE = 3
let buffer = Buffer.alloc(BUFFER_SIZE)
let readeOffset = 0 // 读的偏移量
let writeOffset = 0

fs.open(path.resolve(__dirname,'2.txt'), 'r', function (err, rfd) {
    fs.open(path.resolve(__dirname,'3.txt'), 'w', function (err, wfd) {
        function next() {
            fs.read(rfd,buffer, 0,BUFFER_SIZE,readeOffset, function (err,bytesRead) {
                if (bytesRead > 0){
                    readeOffset+=bytesRead
                    fs.write(wfd, buffer,0,BUFFER_SIZE,writeOffset, function (err,writen) {
                        writeOffset += writen
                        next()
                    })
                }else{
                    fs.close(rfd,()=>{})
                    fs.close(wfd,()=>{})
                }
            }) 
        }
        next()
    })
})


// 嵌套 读写可以分开操作 fs就基于流来实现 大文件的读取
// fs中 createReadStream createWriteStream 基于stream模块来实现


















