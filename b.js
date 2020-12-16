
module.exports = 1


const fs = require('fs')
fs.rmdir // 删除文件夹
fs.unlink // 删除文件
fs.readdir // 读取文件夹
fs.mkdir // 添加文件夹
fs.stat // 文件信息状态 stat里面 statobj参数就有 isFile 是不是文件 isDirectory 是文件夹
fs.readFile // 读取文件
fs.open // 打开文件
fs.read // 读文件
fs.write // 写文件
fs.readFileSync // 同步读取文件
fs.existsSync // 文件是否存在
fs.createReadStream // 创建一个可读流 传入文件路径 配置 可以订阅open 打开文件  data 获取信息 end获取完毕 close关闭可配置
fs.createWriteStream // 创建一个可写流 传入文件路径 配置 可以订阅drain 被消费后触发 close也是可配置 ,ws.write(chunk)写入，ws.end() 关闭
