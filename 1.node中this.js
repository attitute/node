// 默认node中得this是谁

// node中的this， 在文件中this指向的时module.exports 默认是{} 
// commonjs 规范表示所有的代码写到文件中， 文件内部会自带一个函数，这个函数执行的时候改变了this

// 在浏览器中不能直接访问global 都是通过window来代理 node中可以直接访问global

// 系统和用户的区别 一个系统有多个用户，用户中的path只针对当前的用户 系统里配置的支持所有的用户

// node中切换版本工具 nvm  包管理工具nrm
