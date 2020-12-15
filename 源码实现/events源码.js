

function EventEmitter() {
    
}

EventEmitter.prototype.on = function(eventName, callBack){
    if (!this._events) this._events = {}
    if (!this._events[eventName]) {
        this._events[eventName] = []
    }
    if(eventName !== 'newListener'){
        this.emit('newListener', eventName)
    }
    this._events[eventName].push(callBack)
}
// 高阶函数嘛 又利用到了
EventEmitter.prototype.once = function(eventName, callBack){
    let once = (...args)=> {
        callBack(...args)
        this.off(eventName,once)
    }
    once.l = callBack // off可清除  once函数是自己的 用户关闭的是用户的
    this._events[eventName].push(once)
}
EventEmitter.prototype.off = function(eventName, callBack){
    if (!this._events) this._events = {};
    if (this._events[eventName]) this._events[eventName] = this._events[eventName].filter(fn => fn.l!=callBack && fn != callBack)
}
EventEmitter.prototype.emit = function(eventName, ...args){
    if (!this._events) this._events = {}
    if (this._events[eventName]) this._events[eventName].forEach(fn => fn(...args));
}

module.exports = EventEmitter












