// node事件环 

/** 事件环 处理非阻塞i/o操作的机制
 * 
 * 事件循环是一个单独线程，会一直执行
 * 
 * 可分为3阶段
 * node相对于浏览器（执行结果是一样） 本质不同
 * node中有分为多个宏任务队列 
 * node事件环阶段主要分为以下3个
 * 
 * timer // 宏任务 定时器阶段 存放所有的定时器回调
 * pending callback // 待定的回调，执行延迟到下一个循环迭代的i/o回调（i
 * poll // 宏任务 轮询阶段 主要存放存放异步的i/o操作，node中基本所有的异步api的回调都会在这个阶段处理
 * 
 * check // 检测 setTmmediate的回调
 * closecallback // 如：socket.on(close...)
*/
// 具体检测流程
// 主栈->检测时间有没有到达定时 有就执行（清空任务）-> 下一个阶段就是poll阶段，
// 此阶段有最大上线如果超过，则回到timer阶段继续清空再回poll阶段 ->
// 如果poll阶段执行完毕，开始等待，检测check阶段有无，有即执行check阶段 没有的话，执行timer阶段，
// timer阶段执行完毕，回到poll阶段，如果没有下一步那么就阻塞在poll阶段


// 宏任务


// 执行顺序nextTick then timeout
// setTimeout(() => {
//     console.log('timeout');
// }, 0);
// Promise.resolve().then(data=>{
//     console.log('then')
// });
// process.nextTick(()=>{
//     console.log('nextTick')
// }) 
// nextTick优先级高于微任务 先执行next

// 执行顺序 受性能影响 需要看循环时settimeout 是否被放到了队列中 是优先于setImmediate 还是落后
// 但是如果settimeout 设置的时间是很大的 那么肯定是setImmediate先执行
// 官方给的原因：执行计时器的顺序将根据调用它们的上下文而异。如果二者都从主模块内调用，
// 则计时器将受进程性能的约束（这可能会受到计算机上其他正在运行应用程序的影响）。
// setImmediate(() => {
//     console.log('setImmediate');
// });
// setTimeout(() => {
//     console.log('timeout');
// }, 0); 



// 但是在i/o操作中就不会有执行顺序的不确定 有check先执行check
// const fs = require('fs');

// fs.readFile(__filename, () => { // io
//     console.log(1)
//   setTimeout(() => { // timer
//     console.log('timeout');
//   }, 0);
//   console.log(2)
//   setImmediate(() => { // check
//     console.log('immediate');
//   });
//   console.log(3)
// });
