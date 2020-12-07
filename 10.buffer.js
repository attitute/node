// Buffer 二进制对象

// Buffer 代表的是node中得二进制（表现给我们的是16进制 2进制太长了）
// Buffer代表内存大小不能随便更改

let buf1 = Buffer.alloc(10) // 定义buffer长度字节 （node中最小单位字节）
let buf2 = Buffer.from('思')
let buf3 = Buffer.from([1,2,10,22,18,257]);// 这种方式不多

console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf2); // <Buffer e6 80 9d>
console.log(buf3); // <Buffer 01 02 0a 16 12 01>


// gbk编码转换成 utf8
const inconvLite = require('iconv-lite') // 转换编码格式
const fs = require('fs')
const path = require('path');
const { off } = require('process');

let r = fs.readFileSync(path.resolve(__dirname, '1.txt'))
console.log(r); // <Buffer cb bc>
r = inconvLite.decode(r, 'gbk')
console.log(r); // 思 


// 需要对内存机进行拼接处理，可以声明一个更大的buffer 将多个buffer拷贝上去
let buf = Buffer.alloc(6)
let buf4 = Buffer.from('想')


/** copy 
 * 第一个参数 需要拷贝到目标
 * 第二个参数 从目标的哪个下标开始
 * 第三个参数 当前值的开始下标
 * 第四个参数 当前值的结束下标
 * */
buf2.copy(buf,0 , 0, 3) // 
buf4.copy(buf,3,0,3)
console.log(buf.toString()); // 思想


// copy 实现思路 

Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
    for (let i = sourceStart; i <= sourceEnd; i++) {
        targetBuffer[targetStart++] = this[i] // 将自身的内容拷贝到目标buffer
    }
}



/** concat
 *  将两个Buffer拼接
 * 参数一： 需要合并的buffer数组
 * 参数二： 合成后buffer的长度  不传就是默认数组中buffer长度
 * 
*/

let buf5 = Buffer.concat([buf2,buf4],6)
console.log(buf5); // <Buffer e6 80 9d e6 83 b3>

// concat 实现思路
Buffer.concat = function (bufferArr, length) {
    if (typeof length == 'undefined'){ // 不传就是合并buffer总长度
        length = 0
        bufferArr.forEach(buffer => {
            length += buffer.length
        })
    }
    let offset = 0
    let newBuffer = Buffer.alloc(length)
    bufferArr.forEach(buffer => {
        buffer.copy(newBuffer, offset)
        offset += buffer.length
    })
}


// indexOf 字符串中的indexOf同理（匹配认不到就是-1）， 返回的索引是字节的索引 字节的索引 
let buf6 = Buffer.from('1思想思想思想')
// 第一个参数 目标值 第二个参数 从哪个字节索引开始查找
console.log(buf6.indexOf('思',10));


// 实现一个split 
// 
Buffer.prototype.split = function (sep) {
    let arr = []
    let offset = 0 // 偏移位置
    let current = 0 // 当前索引
    let len = Buffer.from(sep).length // 分隔符字节长度
    while((current = this.indexOf(sep, offset)) != -1) {
       arr.push(this.slice(offset, current))
       offset = current + len 
    }
    arr.push(this.slice(offset)) // 分隔符后面内容
    return arr
}
console.log(buf6.split('思').toString())



// Buffer.isBuffer() 判断是不是buffer类型



