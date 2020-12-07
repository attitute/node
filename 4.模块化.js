// node的模块化机制
// 最早：单例模式（无法保证命名的冲突，变量名字过长调用不方便）iife来解决模块化

// 为什么需要模块化（解决冲突，实现高内聚低耦合）

// 常用模块规范 
// commonjs（node） esModule（es6） umd（统一规范 整合了commonjs和AMD规范）

// commonjs 可以按需加载 但是缺陷就是无法实现tree-shaking
// es6 模块 只能静态依赖 可以实现tree-shaking 可以分析需要的依赖


// commonjs 规范
// 1.每一个文件都是一个模块
// 2.需要通过module.exports导出需要给其它模式使用的值
// 3.通过require 拿到结果


// commonjs规范里： 三种模块
// 自定义模块、文件模块（require导入的文件） / 第三方模块（别人写的模块） / 内置模块和核心模块（node自带的 fs path 等）

// 内置模块和核心模块 node中自带的不需要安装，引用时不需要添加路径
const fs = require('fs') // 处理文件  有100多个方法

fs.readFileSync('./1.node中this.js','utf-8') // 同步获取
fs.existsSync('./1.node中this.js') // 同步判断是否存在


const path = require('path') // 处理路径\

// resolve多传入的参数会拼接  但是遇到绝对路径/ 就会出现问题直接回到根路径
path.resolve(__dirname, '1.node中this.js', '2.node中的一些重要模块.js') // 解析出一个绝对路径 默认是以process.cwd()解析

// join与resolve作用是一样的 但是传入绝对路径不会出现问题  正斜杠会自动转成反斜杠
path.join(__dirname, '2.node中的一些重要模块.js', '/','1.node中this.js')

path.extname('./1.node中this.js') // 获取文件后缀名

path.relative('./node_modules/commander' , 'node_modules') // 差异相减 。/commander

path.dirname('1.node中this.js') // 取目录名 


const vm = require('vm') // node中将字符串转换成函数的模块

// js中eval函数 和 newFunction都可以转换字符串成函数
// eval执行没有沙箱机制 会依赖外层的变量
// new Funciotn 有沙箱机制

// node中有模块所以不需要

vm.runInThisContext() // 运行方式同 new Function 不需要把字符串包装成函数






