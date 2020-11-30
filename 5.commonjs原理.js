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

const { dir } = require('console')
const fs = require('fs')
const path = require('path')
const vm = require('vm')


Module._extensions = {
  '.js'(module){
    let script = fs.readFileSync(module.id) // 读取文件内容
    let code =  `(function (exports, require, module, __filename, __dirname) {
      ${script}
    })`
    let func = vm.runInThisContext(code) // 转换成函数
    let exports = module.exports
    let thisValue = exports
    let dirname = path.dirname(module.id)
    func.call(thisValue, exports, req, module, module.id, dirname)
  },
  '.json'(){

  }
}


function Module(id) {
  this.id = id
  this.exports = {}
}

Module.resolveFilename = function (id) {
  let filePath = path.resolve(__dirname,id)
  if (fs.existsSync(filePath))return filePath
  let keys = Object.keys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    let newFilepath = filePath + keys[i]
    if (fs.existsSync(newFilepath)) return newFilepath
  }
  throw new Error('模块不存在')
}

Module.prototype.load = function (filename) {
  let ext = path.extname(filename)
  Module._extensions[ext](this) // 传入this
}

Module._load = function (id) {
  let filename = Module.resolveFilename(id) // 完整路径

  let module = new Module(filename)
  module.load(filename)
  return module

}


function req(id) {
  let module = Module._load(id)
  return module.exports
}



const r = req('./b')
console.log(r)

