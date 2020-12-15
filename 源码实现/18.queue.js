
const linkedList = require('./17.linkedList')

class Queue {
    constructor(){
        this.ll = new linkedList()
    }
    add(){ // 向后添加
        this.ll.add(element)
    }
    offer(){ // 从头部删除
        return this.ll.remove(0)
    }
}

module.exports = Queue








