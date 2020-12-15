
class Node {
    constructor(element, next){
        this.element = element
        this.next = next
    }
}

class LinkedList {
    constructor() {
        this.head = null // head
        this.size = 0 // 给链表排序
    }

    _node(index){ // 获取传入索引的节点
        let current = this.head
        for(let i = 0; i < index; i++) {
            current = current.next // 每次让current后移
        }
        return current
    }

    add (index, element){
        if(arguments.length == 1){ // 只传了一个参数 所以我们要给他排序
            element = index 
            index = this.size
        }
        if(index == 0){ // 第一次将它作为头
            this.head = new Node(element, this.head)
        }else {
            let preNode = this._node(index - 1)// 找到上一个节点
            preNode.next = new Node(element, preNode.next) // 上一个节点的next指向当前节点 当前节点的next延用上个节点的
        }
        this.size++ // 链表的链加1
    }
    remove(index){
        let removeNode;
        if(index == 0){ // 删除第一项
            removeNode = this._node(index)
            this.head = this.head.next // 把开始值改成开始值得下一个
        }else {
            let preNode = this._node(index - 1) // 上一项
            removeNode = preNode.next // 保存删除项
            preNode.next = preNode.next.next
        }
        this.size--
        return removeNode.element
    }
    set(index, element){
        let node = this._node(index)
        node.element = element
        return node
    }
    get(index){
        return this._node(index)
    }
    // 单向链表翻转
    reverseList(){
        function reverse(head) {
            if (head == null || head.next == null){ // 说明可以结束了
                return head
            }
            let newHead = reverse(head.next)
            head.next.next = head // 当前项的下一项的next指向当前项
            head.next = null // 当前项的next指向null

            return newHead
        }

        this.head = reverse(this.head)
        return this.head // 返回翻转后的头
    }
}


let ll = new LinkedList()
ll.add(1)
ll.add(2)
ll.add(3)
// console.log(ll)
console.log(ll.reverseList())
// console.log(ll.get(0))






