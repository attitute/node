

class Node {
  constructor(element, next){
    this.element = element
    this.next = next
  }
}

class linkedList {
  constructor (){
    this.head = null
    this.size = 0
  }
  _node(index){
    let current = this.head
    for(let i = 0; i < index; i ++){
      current = current.next
    }
    return current
  }
  add(index, element){
    if (arguments.length == 1){
      element = index 
      index = this.size
    }
    if (index == 0){
      this.head = new Node(element, this.head)
    }else {
      let preNode = this._node(index - 1)
      preNode.next = new Node(element, preNode.next)
    }
    this.size++
  }
  remove(index){
    let removeNode;
    if (index == 0){
      removeNode = this.head
      this.head = this.head.next
    }else {
      let preNode = this._node(index - 1)
      removeNode = preNode.next
      preNode.next = preNode.next.next
    }
    this.size--
    return removeNode
  }
  set(index,element){
    let preNode = this._node(index)
    preNode.element = element
    return preNode
  }
  get(index){
    let node = this._node(index)
    return node
  }
  resverList() {
    function resver(head) {
      if (head.next == null) {
        return head
      }
      let newHead = resver(head.next)
      head.next.next = head
      head.next = null
      return newHead
    }
    this.head = resver(this.head)
    return this.head
  }
}


let ll = new linkedList()
ll.add(1)
ll.add(2)
ll.add(3)
// ll.remove(0)
console.log(ll.resverList(0))
console.dir(ll, {depth: 100})