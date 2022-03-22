
const pathToRegExp = require('path-to-regexp')

function layer(path, handle) {
    this.path = path
    this.regExp = pathToRegExp(this.path, this.keys = []) // 将path路径 转成正则 keys存的就是传入的:id 里面的id
    this.handle = handle
}
layer.prototype.match = function (pathname) {

    if (this.path = pathname){
        return true
    }
    if(!this.route){
        if(this.path == '/'){
            return true
        }
        return pathname.startsWith(this.path + '/')
    }else { // 路由
        let [,...matches] = pathname.match(this.regExp)// ['path完整路径','：匹配到的值1', '：匹配到的值2'... ,]
        
        let params = {} // 动态路由 与相匹配的值 {id: 2}
        this.keys.forEach((item, index)=>{
            params[item.name] = matches[index]
        })

        return true
    }
    return false
}
return layer

