Promise.resolve().then(() => {
    console.log("then1");
     Promise.resolve().then(() => {  
        // promise A+ ecmaScript 规定了 如果一个promise中的then成功或者失败的回调返回一个promise，会将这个promise进行延迟操作。 这个返回的promise你需要将他看成2个then
        return 1// 一个promise返回一个promise  resolvePromise(x) => x.then
    }).then(() => {
        console.log("then1-2");
    });
})
.then(() => {
    console.log("then2");
})
.then(() => {
    console.log("then3");
})
.then(() => {
    console.log("then4");
})
.then(() => {
    console.log("then5");
})