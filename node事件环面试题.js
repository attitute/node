
// Promise.resolve().then(() => {
//     console.log("then1");
//     Promise.resolve().then(() => {
//         console.log("then1-1");
//        return Promise.resolve(); // 本身就.then了一次  想想源码小伙子
//     }).then(() => {
//         console.log("then1-2");
//     });
// })
// .then(() => {
//     console.log("then2");
// })
// .then(() => {
//     console.log("then3");
// })
// .then(() => {
//     console.log("then4");
// })
// .then(() => {
//     console.log("then5");
// })


// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//       console.log("timerStart");
//       resolve("success"); // resolve中的then 也是微任务
//       console.log("timerEnd");
//     }, 0);
//     console.log(2);
//   });
//   promise.then((res) => {
//     console.log(res);
//   });
//   console.log(4);



  
// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？

// function red() {
//     console.log('red');
// }
// function green() {
//     console.log('green'); 
// }
// function yellow() {
//     console.log('yellow');
// }

// let arr = [green ,yellow, red]

// let i = 0
// setInterval(() => {
//     arr[i++]()
//     if (i == 3)i=0
// }, 1000);


// (function light() {
//     return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 console.log('red');
//                 resolve()
//             }, 3000);
//         }).then(() => {
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     console.log('green');
//                     resolve()
//                 }, 2000);
//             })
//         })
//         .then(() => {
//             return light();
//         })
// })()

