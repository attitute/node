// Buffer 二进制对象
//  浏览器现有的二进制对象 Blob File

// js运行再node环境下 对文件做处理 前端传递的文件都市二进制对象


// 编码规范 127个 ASCII 
// 刚开始的ASII码并不适合中文 太少啦 
// GB2312 => GBK => GB18030(加入了一些少数民族字体) 
// utf-8是由3个字节组成  gbk汉字是由两个字节组成

// node中不支持gbk  只支持utf8


// 10进制 255
// 2进制最大 11111111 
// 8进制 0开头 377
// 16进制 0xff


// 把任意的进制转换成10进制 
console.log(parseInt('11111111', 2)) // 255

// 把任意进制转换成任意进制
console.log((0x16).toString(10)) // 22


// | & << 针对二进制的
// << 位移表示平方
console.log(1 << 3) // 00001000

// 101 | 010 => 111
console.log(0b101 | 0b010) // 7
console.log(0b101 & 0b010) // 0
console.log(0b111 & 0b110) // 6




/**                 base64编码
 * 
 * base64 (没有加密功能) 转换后会比原先得大1/3
 * 把一个汉字变成base64编码 一个汉字由3个字节组成 24个位
 * 然后把24个位 分成4个等份 
 * 
*/


console.log(Buffer.from('思')) // e6 80 9d
console.log((0xe6).toString(2)) // 11100110
console.log((0x80).toString(2)) // 10000000
console.log((0x9d).toString(2)) // 10011101

// 11100110 10000000 10011101  
// 111001 101000 000010 011101  // 转成10进制

console.log(parseInt(0b00111001)); // 57
console.log(parseInt(0b00101000)); // 40
console.log(parseInt(0b00000010)); // 2
console.log(parseInt(0b00011101)); // 29

// 64位组成码
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str += str.toLowerCase();
str += '0123456789+/'; // 64

console.log(str[57] + str[40] + str[2] + str[29]) // 5oCd 就是思的base64位编码

// base64 组成是由 大小写字母52位 + 0-9数字10位 + +/两位 共64位

// 转成base64
// 1.将需要转换的汉字转成 24位（比特）
// 2.将3字节*8比特的24位 转成 4*6的24位 
// 3.计算每一个得到10进制想应值 
// 4.在64位中取10进制值的下标拼接即得

// base64 可以放在任何替代的url路径上 图片 背景图 链接



