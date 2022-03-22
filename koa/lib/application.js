

const EventEmitter = require("events")

const context = require("./context")
const request = require("./request")
const response = require("./response")

class Application extends EventEmitter {
    constructor(){
        super()
        this.context = Object.create(context) // 每次创建实例就隔离了
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middlewares = []
    }

    use(middleware){
        this.middlewares.push(middleware)
    }

    createContext(req, res){
        let ctx = Object.create(this.context)// 每次请求都隔离了
        let request = Object.create(this.request)
        let response = Object.create(this.response)
        ctx.request = request; // req的属性都是原生的
        ctx.req = ctx.request.req = req

        ctx.response = response
        ctx.res = ctx.response.res = res

        return ctx
    }

    compose(ctx){
        const dispatch = (i)=>{
            if(i === this.middlewares.length) return Promise.resolve()
        
            let middleware = this.middlewares[i]
            return Promise.resolve(middleware(ctx, ()=>{dispatch(i+1)}))
        }
        return dispatch(0)
    }

    handleRequest(req,res){
        let ctx = this.createContext(req, res)

        res.statusCode = 404

        this.compose(ctx).then(()=>{
            
            if (ctx.body){
                res.edn(ctx.body)
            }else {
                res.end('Not Found')
            }

        })

    }

    listen(){
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(...arguments)
    }

}

module.exports = Application

