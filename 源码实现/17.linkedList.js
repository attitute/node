


class Node {
    constructor(element, next){
        this.element = element
        this.next = next
    }
}

class LinkedList{
    constructor(){
        this.head = null
        this.size = 0 // 维护链表的传毒
    }

    _node(index){ // 给我个索引帮你获取到这个节点
        // 索引不能大于size 否则抛出异常
        let current = this.head
        for (let i = 0; i < index; i++){
            current = current.next
        }
        return current
    }

    // 参数可能是2个 可能是一个
    add (index, element){
        if(arguments.length == 1){
            element = index
            index = this.size
        }
        if (index == 0){
            let head = this.head // this.head
            this.head = new Node(element,head)
        }else {
            // 找到索引位置 添加一个
            let prevNode = this._node(index - 1)
            prevNode.next = new Node(element, prevNode.next)
        }
        this.size++
    }
    remove(index){ // 删除
        let removeNode;
        if (index == 0){ // 移除头节点
            removeNode = this.head
            this.head = this.head.next
        }else {
            let prevNode = this._node(index - 1) // 当前索引得上一个 
            if(!prevNode)return
            prevNode.next = prevNode.next.next // 上一个指向索引的下一个
            removeNode = prevNode.next
        }
        this.size--
        return removeNode.element
    }
    set(index, element){ // 修改
        let node = this._node(index)
        node.element = element
        return node
    }
    get(index){ // 获取
        return this._node(index) // 返回获取到的节点
    }
    reverseList(){ // 链表反转
        function reverse(head) {
            if(head == null || head.next == null){ // 下一个节点就是没了
                return head
            }
            let newHead = reverse(head.next) // 传入当前head的下一项 newHead头 新头一直在变化
            head.next.next = head // 当前head的下一项 指向当前head 反转
            head.next = null // 当前head 指向null
            return newHead
        }

        this.head = reverse(this.head)
        return this.head
    }
}

module.exports = LinkedList


let ll = new LinkedList()
// ll.add(0,1) // 0 null
// ll.add(0,2) // 1 node实例head size
// ll.add(0,3)
// ll.add(0,10)
// console.log(ll)






