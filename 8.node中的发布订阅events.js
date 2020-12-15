
// events
// 发布订阅模式 node内置了这个模块
const EventEmitter = require('./源码实现/events源码'); // 事件触发器

const util = require('util') // 内置模块 能够继承

function Girl() {
    
}

util.inherits(Girl, EventEmitter)

let jack = new Girl()

let jupm = function () {
    console.log('I JUMP')
}
jack.on('jump', jupm)
jack.on('jump', (...args)=>{
    console.log('YOU JUMP', ...args)
})
jack.once('jump', (...args)=>{
    console.log('YOU JUMP ROSE')
})

jack.emit('jump','rose')
// jack.off('jump',jupm)
jack.emit('jump','rose')


