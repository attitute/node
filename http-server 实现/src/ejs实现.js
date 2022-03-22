
// ejs主要实现方式

// 核心 html字符拼接 js 可使用模板字符`${}` 最后使用with  new function （字符转函数）

/**
 * 获取html文件的字符串 
 * 使用html变量 拼接所有不需要处理的html内容
 * 特殊符号内的内容直接解析出来
 * 特殊符号中间的html内容拼接到html变量上
 * js如果循环几次就产生多少个
 * 至于符号中间内容的取值 直接把js进行${}包裹就行了
 * 至此 把刚刚的内容放到with 就行 里面变量取值的this就是 with传入的内容
 * 然后将拼接好的字符串 放入new Function 中（字符串变函数） 函数调用 执行 
*/

const fs = require('fs').promises
let ejs = {
    async renderFile(templateUrl, data) {
        let content = await fs.readFile(templateUrl,'utf8');
        let head = `let html = '';\r\n with(obj){\r\n`;
        head += 'html+=`'
        content = content.replace(/<%=(.+?)%>/g,function () {
               return '${'+arguments[1] + '}'
            })
        let body = content.replace(/<%(.+?)%>/g,function () {
            return '`\r\n' + arguments[1]  + '\r\nhtml+=`';
        })
        let tail = '`}\r\n return html'
        let tempalteStr = head + body + tail;

        // 可以隔离作用域 会创建一个和全局平行的作用域
        let fn = new Function('obj',tempalteStr);
        return fn(data);
        // let content =await fs.readFile(templateUrl,'utf8');
        // return content.replace(/<%=(.+?)%>/g,function () {
        //    return data[arguments[1]]
        // })
        // with + new Function
    }
}

// 目的： 生成这种形式的函数
function anonymous(obj) {
    let html = '';
    with(obj) {
        html += `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        `
        arr.forEach(item => {
            html += `
            <li>${item}</li>
        `
        })
        html += `
    </body>
    </html>`
    }
    return html
}
console.log(anonymous({arr:[1,2,3]}))

module.exports = ejs