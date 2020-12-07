// 文件模块解析流程  解析流程是每个版本不一样的


// 1）文件模块
// 默认先找文件（添加js，json后缀） 再找文件夹 
// package.json代表包的描述信息 
// 老版本文件夹内有描述信息 先找文件夹再找文件
// 新版本不影响



// 如果没有 ./ 或 ../ 或 绝对路径 就认为此模块是一个第三方模块或者核心模块


// 2）第三方模块 都会安装到node_modules文件夹
// 第三方模块直接取node_modules下面找
let r = require('jq')
console.log(r)

// 2.1）补充
// 第三方模块 全局（安装带-g）和本地（直接安装）区别

// 全局模块 只能在命令行使用
// 本地模块 项目中直接使用

// 3) 核心模块 不用安装



// 4） npm

// npm 包管理工具nrm（nrm test 测试所有源地址速度）  node包管理工具nvm
// npm install nrm -g --force   --force卸载以前的强制重新安装
// C:\Users\ooooosy\AppData\Roaming\npm\node_modules\nrm\cli.js // 安装包的位置

// npm root -g 查找全局目录 
// C:\Users\ooooosy\AppData\Roaming\npm\nrm 

// nrm的功能就是修改npm中的 .npmrc文件中的配置 registry
// npm config list npm一些配置


// 因为npm被放在了全局下， 所有的npm目录下的命令都可以直接执行


