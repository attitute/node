// const fs = require('fs') // libuv非阻塞i/o操作
const fs = require('fs').promises // libuv非阻塞i/o操作 // promise async await
const { type } = require('os')
const path = require('path')

// linux 命令 mkdir -p a/b/c 创建文件夹 （linux层面，子进程方式操作目录）

// fs.mkdir() // 创建文件夹
// fs.rmdir() // 清除文件夹（需要先清空子目录）
// fs.readdir // 读取目录 读取儿子
// fs.stat // 文件状态信息 返回值有isFile isDirectory等
// fs.unlink // 删除文件

// 异步串行(把所有的流程做成一根线 )和并发(同时多个异步操作,结束就通知)

// 读取目录中的子节点

// // 1.异步串行 深度优先
// function myRmdir(dir,callback) {
//     fs.stat(dir, function (err, statObj) {
//       if (statObj.isFile()) {
//         fs.unlink(dir, callback)
//       } else {
//         fs.readdir(dir, function (err, dirs) {
//           dirs = dirs.map(d => path.join(dir, d))
//           let index = 0
//           function next() {
//             if(index == dirs.length) return fs.rmdir(dir, callback)
//             let current = dirs[index++]
//             myRmdir(current,next)
//           }
//           next()
//         })
//       }
//   })
// }

// // 2.异步串行 广度优先
// function myRmdir1(dir, cb) {
//     let stack = [dir];
//     let index = 0;
//     function reverseRemove(){
//       console.log('reverseRemove:',stack)
//         let idx = stack.length - 1;
//         function next(){
//             if(idx < 0) return cb();
//             let cur = stack[idx--];
//             fs.rmdir(cur,next);
//         }
//         next();
//     }
//     fs.stat(dir, (err, statObj) => {
//         if (statObj.isFile()) {
//             fs.unlink(dir, cb); // 如果是文件直接删除即可
//         } else {
//             // 如果时目录 采用广度遍历的方式， 采用异步的方式读取目录 维护想要的结果，最终将结果倒叙删除
//             let idx = 0;
//             function next(){
//                 let dir = stack[idx++];
//                 if(!dir) return reverseRemove();
//                 fs.stat(dir, (err, statObj) => {
//                   if (statObj.isFile()) {
//                       fs.unlink(dir, cb);
//                       stack.splice(--idx, 1)
//                     console.log(stack, 'stack')
//                       next();
//                   } else {
//                     fs.readdir(dir,(err,dirs)=>{
//                         dirs = dirs.map(d=> path.join(dir,d));
//                         stack.push(...dirs);
//                         next();
//                     })
//                   }
//                 })
//             }
//             next();           
//         }
//     });
// }

// 3.并发删除
// function myRmdir2(dir, cb) {
//     fs.stat(dir, (err, statObj) => {
//         if (statObj.isFile()) {
//             fs.unlink(dir, cb); // 如果是文件直接删除即可
//         } else {
//             // 同时删除子元素 （如果子元素为空需要删除自己）
//             fs.readdir(dir, (err, dirs) => {
//                 dirs = dirs.map(d => path.join(dir, d));
//                 if (dirs.length == 0) {
//                     return fs.rmdir(dir, cb); // 没有子文件或者文件夹
//                 }
//                 let idx = 0;
//                 function removeCount() {
//                     if (++idx === dirs.length) {
//                         fs.rmdir(dir, cb);
//                     }
//                 }
//                 dirs.forEach(dir => {
//                     myRmdir2(dir, removeCount);
//                 })
//             })
//         }
//     });
// }

// // 4.promise优化
// function myRmdir3(dir) {
//     return new Promise((resolve, reject) => {
//         fs.stat(dir, (err, statObj) => {
//             if (err) reject(err);
//             if (statObj.isFile()) {
//                 fs.unlink(dir, resolve); // 如果是文件直接删除即可
//             } else {
//                 // 同时删除子元素 （如果子元素为空需要删除自己）
//                 fs.readdir(dir, (err, dirs) => {
//                     if (err) reject(err);
//                     // map返回的是删除儿子列表的promise数组
//                     dirs = dirs.map(d => myRmdir3(path.join(dir, d)));
//                     Promise.all(dirs).then(() => {
//                         fs.rmdir(dir, resolve)
//                     }).catch(err => {
//                         reject(err);
//                     })
//                 })
//             }
//         });
//     })
// }

// 5.使用async + await
// 深度优先，广度优先

// async function myRmdir4(dir) { 
//     let statObj = await fs.stat(dir); // statObj, 如果文件不存在就报错了 
//     if (statObj.isDirectory()) {
//         let dirs = await fs.readdir(dir); // 这个返回的是数组
//         // 将所有子文件进行删除 并且用promise.all包裹起来
//         // Promise.all返回的是promise实例
//         await Promise.all(dirs.map(d => myRmdir4(path.join(dir, d))));
//         await fs.rmdir(dir)
//     } else {
//         await fs.unlink(dir);
//     }
// }
// myRmdir4('a').then(() => {
//     console.log('删除成功')
// }).catch(err=>{
//     console.log('删除失败')
// });




let obj = {
    Name: '张三',
    Age: '22',
    First: [
      { Name: 1000, Remark: 'a' 
      },
  //     {
  //       Second: [
  //         { Name: 1200, Remark: '' },
  //         { Name: 1300, Remark: '' }
  //       ]
  //     }
    ]
  }

  function formate(obj) {
    // let key;
    let queue = []
    queue.push(...Object.keys(obj))
    while(queue.length){
      let key = queue.shift()
      let value = obj[key]
      function next(value,key) {
        if (Array.isArray(value)){
          let index = 0
          function arr(value) {
            key = key + `[${index}]`
            next(value[index++], key)
            if (index == value.length)return
          }
          arr(value)
            // for (var i = 0; i < value.length; i++){
            //   key = key + `[${i}]`
            //   next(value[i], key)
            // }
        }else if(typeof value == 'object' && value !== null){
          let newv = Object.keys(value)
          let index = 0
          function arr(newv) {
            key = key + `[${index}]`
            next(value[newv[index++]], key)
            if (index == newv.length)return
          }
          arr(newv)
          // for (var i = 0; i < newv.length; i++){
          //   key = key + `.${newv[i]}`
          //   next(value[newv[i]], key)
          // }
        }else {
          obj[key] = value
        }
      }
      next(value,key)
    }
    return obj
  }
console.log(formate(obj))
  
  // {
  //     Name: '张三',
  //     Age: '22',
  //     'First[0].Second[0].Name': 1000,
  //     'First[0].Second[0].Remark': '',
  //     'First[0].Second[1].Name': 1100,
  //     'First[0].Second[1].Remark': '',
  //     'First[1].Second[0].Name': 1200,
  //     'First[1].Second[0].Remark': '',
  //     'First[1].Second[1].Name': 1300,
  //     'First[1].Second[1].Remark': ''
  //   }



