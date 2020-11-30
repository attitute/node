// console.log(global); // 全局上可以直接访问的属性我们叫他全局变量

// 所有模块都可以直接访问到以下5个变量 但是并不是global上的
// __dirname __firname require module exports


// console.log(global) // setTimeout queueMicrotask (setImmediate)
// console.log(process) // process 代表进程 可以获得运行时一些环境和参数

//  process上有 platform: 'win32' 代表window  mac => darwin 

// process上一些使用比较多的
// chdir（可以修改当前工作目录路径）
// cwd（当前的工作目录） 
// env （环境变量）
// argv （用户执行时传递的参数）
// nextTick （优先级比微任务高）

// 1. cwd （current working directory 当前的工作目录） 运行时产生的一个路径 指向在哪里执行（可以改变）

// process.chdir('../../') // 修改当前工作目录路径
// console.log(process.cwd()); // 获取当前工作目录 相对路径相对的是工作目录， 不是当前文件所在的目录
// console.log(__dirname) / 绝对路径 指代当前文件所在的目录

// 如果是一个确定路径 那就是使用绝对路径

// 2. env 默认会读取全局的（临时设置变量 -> 只针对当前的环境） cross-env(npm i cross-env -g)
// 原理就是 set NODE_ENV = development     window
//         export NODE_ENV = development  ios
// console.log(process.env) // 上面设置了就能拿到


// 3. argv 用户执行时传递的参数
// node 当前文件 --port 3000 --config webpack.config.js 
// console.log(process.argv) // 能拿到上面设置的参数
// process.argv[0] // node的可执行文件 
// process.argv[1] // node执行的文件 
// process.argv[之后的] // 用户传递的参数

// 3.1 自己获取argv中的参数
// let program = {}
// process.argv.slice(2).forEach((item,index,array)=>{
//     if(item.startsWith('--')){
//         program[item.slice(2)] = array[index+1]
//     }
// })
// console.log(program)

// 3.2 别人有写好的 commaner （npm install commander -g）

const program = require('commander')

// 脚手架 工程化工具 解析用户的各种参数
//             简写  全写  参数   描述
program.option('-p, --port <n>', 'set ues port')
program.option('-c, --config <n>', 'set ues config file')

// 当我执行create命令时 就会触发action事件
// node 2.node中的一些重要模块.js  create
program.command('create').description('create project').action(()=>{
    console.log('create project')
})

program.on('--help', ()=>{ // 监听--help事件 来输出信息
    console.log('\n See web site for more information.') // 自定义信息
})

program.parse(process.argv)
console.log(program) // 打印当前信息








