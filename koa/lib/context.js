const ctx = {}

function defineGetter(target, key) {
    ctx.__defineGetter__(key, function () {
        return this[target][key]
    })
}

function defineSetter(target, key) {
    ctx.__defineSetter__(key, function (value) {
        this[target][key] = value
    })
}



defineGetter('request', 'url')
defineGetter('request', 'path')

defineGetter('response', 'body')
defineSetter('response', 'body') // 设置值


module.exports = ctx
