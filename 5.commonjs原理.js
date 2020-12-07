
const path = require('path')
const fs = require('fs')
const vm = require('vm')



function Module(id) {
    this.id = id
    this.exports = {}
}

Module._extensions = {
    '.js'(module){
        let script = fs.readFileSync(module.id, 'utf-8')
        let code = `(function(exports, require, module, __filename, __dirname){
            ${script}
        })`
        let func = vm.runInThisContext(code)
        let exports = module.exports
        let thisValue = exports
        let dirname = path.dirname(module.id)
        func.call(thisValue, exports, req, module, module.id, dirname)
    },
    '.json'(module){
        let script = fs.readFileSync(module.id, 'utf-8')
        module.exports = script

    }
}

// 查找文件完整路径
Module.resolveFile = function (id) {
    let filepath = path.resolve(__dirname,id)
    if (fs.existsSync(filepath))return filepath
    let keys = Object.keys(Module._extensions)
    for(let i = 0; i < keys.length; i++) {
        let newFilepath = filepath + keys[i]
        if (fs.existsSync(newFilepath)) return newFilepath
    }
    throw new Error('模块报错')
}

Module.prototype.load = function (id) {
    let ext = path.extname(id)
    Module._extensions[ext](this)
}

// 主要模块
Module._load = function (id) {
    let filepath = Module.resolveFile(id)
    let module = new Module(filepath)
    module.load(filepath)
    return module
}

// 导入模块方法
function req(id) {
    let module = Module._load(id)
    return module.exports
}


const r = req('./c') 

console.log(r)


/**
 * 核心：req导入函数方法，里面有module._load方法做处理
 * _load方法中 首先获取当前文件完整路径 path.resolve(__dirname,id)得到文件完整路径 fs.existsSync()文件是否存在 fs.readFileSync()读取文件
 * 将当前文件完整路径保存再Module函数中 并且返回一个module实例
 * 使用策略模式进行分文件名的处理
 * load方法中进行策略模式调用
 * _extensions对象中每一个后缀名 对应一个方法进行处理
 * 
 * js后缀名为例： 将Module的实例传入函数中， 使用完整路径查找文件内容
 * 找到文件内容拼接函数字符串 传入 exports require module __firname __dirname（这些是根据源码来写的）
 * js中一般使用eval函数或者new Function 进行字符串转函数  
 * node中有提供vm模块进行字符串转函数的功能
 * vm.runInThisContext方法  转换得到的函数进行运行 防止this指向不明确 所以传入exports指向当前实例的exports
 * 
 * 即 完成
 * 
*/

// 源码解析
// require 是一个Module原型上的方法 Module.prototype.require 
// Module._load 加载方法（模块加载）
// Module._resolveFilename(解析文件名 变成绝对路径 并且带有后缀)
// new Module 创建一个模块（id, exports） reuqire方法获取到的是module.exports 属性
// Module.prototype.load 进行模块加载
// Module._extensions ,js模块 json模块， 根据不同的后缀名 使用不同的策略去进行模块的加载
// fs.readFile都去文件内容
// module._compile 进行内容包裹一个函数
// const wrapper = [
//   '(function (exports, require, module, __filename, __dirname)){script}'
// ]
// 让函数执行， 用户会给exports赋值
// 最终获取到的就是module.exports的结果