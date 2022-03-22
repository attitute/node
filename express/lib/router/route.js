
const Layer = require('./layer')
const methods = require('methods')

function route() {
    this.stack = []
    this.methods = {}
}

methods.forEach(method=>{
    route.prototype[method] = function(handlers){
        handlers.forEach(handle=>{
            const Layer = new Layer('/', handle)
            Layer.method = method // 暂时写死get
            this.methods[method] = true
            this.stack.push(Layer)
        })
    }

})

route.prototype.dispatch = function (req,res,out) {
    let requestMethod = req.method.toLowerCase();

    let idx = 0;
    const next = (err) => {
        if(err) return out(err) // 如果有错误就直接跳出循环
        if (!this.stack[idx]) return out() // 栈清空自动跳出
        const layer = this.stack[idx++]
        if(requestMethod == layer.method){
            layer.handle(req,res,next) // 这个是用户的回调
        }else {
            next()
        }
    }
    next()
}

module.exports = route

