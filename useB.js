
const path = require('path')
const fs = require('fs')
const vm = require('vm')
const { Console } = require('console')

function Module(id){
    this.id = id
    this.exports = {}
}

// 储存解析规则 策略模式 不同类型不同处理方式
Module._extensions = {
    '.js'(module){
        let script = fs.readFileSync(module.id, 'utf8') // 读取文件的内容
        let code = `(function (exports, require, module, __filename, __dirname) {
            ${script}
        })`
        let func = vm.runInThisContext(code)
        let exports = module.exports
        let thisValue = exports
        let dirname = path.dirname(module.id)
        
        func.call(thisValue, exports, req, module, module.id, dirname)

    },
    '.json'(module){
        let script = fs.readFileSync(module.id, 'utf8') // 读取文件的内容
        module.exports = JSON.parse(script) // 直接将json文件内容挂载到exports
    }
}

// 获取文件完整路径
Module._resolveFilename = function(id){
    let filePath = path.resolve(__dirname, id)
    // 查找文件路径是否存在 如果不存在尝试添加后缀
    let isExsits = fs.existsSync(filePath)
    if(isExsits)return filePath
    let keys = Object.keys(Module._extensions)
    for(let i = 0; i < keys.length; i++){
        let newFilepath = filePath + keys[i]
        if(fs.existsSync(newFilepath))return newFilepath
    }
    throw new Error('模块文件不存在')
}

// 根据文件不同的后缀进行加载
Module.prototype.load = function () {
    let extname = path.extname(this.id) // 取文件名的后缀
    Module._extensions[extname](this)

}

// 缓存
Module._cache = {}

Module._load = function (id) {
    let filename = Module._resolveFilename(id) // 将用户路径变成绝对路径
    if (Module._cache[filename]){
        return Module._cache[filename].exports // 如果有缓存直接将上次缓存返回
    }
    let module = new Module(filename) // 引入一个模块构建一个对象
    Module._cache[filename] = module
    module.load(); // 内部读取文件 用户给exports对象赋值
    return module.exports // 返回用户定义的exports值
}


function req(id) { // 根据用户名加载模块
    return Module._load(id) // 接收到了exports值
}




const r = req('./c')
req('./c')
req('./c')
req('./c')
req('./c')
console.log(r)

// 问题1. module.exports 和 exports关系是什么 （module.exports = {} exports = module.exports 最后导出还是module.exports）
// 就是看引用类型的问题 exports会不会影响到module.exports

// 问题2. b模块中的global 和 useB中的模块是不是同一个（是同一个，所有相关模块中的global都是同一个，尽量不要使用global， 可能污染全局变量， 数据库连接conn可能用到）

// 问题3. 同时写module.exports 和 exports， 跟问题一的关系是一样的 自己判断

// module.exports 导出的是值 如果值是引用类型那么获取的模块值也会变

// 循环引用问题： 拆分模块解决 弄一个第三方模块







// 调试node代码
// 1. 浏览器 1.1输入命令node --inspect-brk 文件名  1.2google浏览器输入：chrome://inspect 

// vscode 直接进行调试
// 左侧臭虫 添加node调试 launcg=h,josn中配置
// "skipFiles": [], // 是否跳过源代码 我们目前调试就是源代码 所以清空数组
// "program": "${workspaceFolder}\\useB.js" // 调试的文件
