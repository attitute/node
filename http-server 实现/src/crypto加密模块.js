

const crypto = require('crypto')

// 加密算法就是能解密 但是摘要算法只能撞库
// 一般加密MD5（摘要算法） sha1/sha256（加盐算法）

// 1.md5 是不能反解的
// 2.摘要 不能通过摘要结果 反推出摘要前值 如果内容有一点变化那摘要结果完全不同(雪崩)
// 3.相同值摘要出来的结果相同 所以可以撞库解密md5
// 4.所有的摘要出来的结果 长度是相同的

// 采用三轮以上的md5 就无法破解了

// 相同值摘要出来的结果相同
crypto.createHash('md5').update('123').update('456').digest('base64') = crypto.createHash('md5').update('123456').digest('base64');
crypto.createHash('sha1','yanzhi').update('123').digest('base64')


