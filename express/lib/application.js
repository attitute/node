
const http = require('http')
const Router = require('./router') 
const methods = require('methods')

function Application() {
    // this._router = new Router()
}

Application.prototype.lazy_route = function () {
    if(!this._router) this._router = new Router()
}

methods.forEach(method =>{
    Application.prototype[method] = function (path, ...handlers) {
        this.lazy_route() // 调用方法才创建router
        this._router[method](path, handlers) // 交给路由处理 应用不参与
    }
})

Application.prototype.use = function (path, ...handler) {
    this.lazy_route()
    this._router.use(...arguments)
}

Application.prototype.listen = function (...args) {
    const Server = http.createServer((req,res)=>{
        this.lazy_route()
        function done() {
            console.log(`Cannot ${req.method}${req.url}`)
        }
        this._router.handle(req,res,done)
    })
    Server.listen(...args)
}
module.exports = Application




