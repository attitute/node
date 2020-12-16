
// 二叉树 (也可以叫度,一个叉就是一度，二叉树最多是两度)
// 左子树 右子树
// 二叉树的深度（从根节点到最末尾节点），高度（从根节点到整个树最末尾节点）
// 二叉树子节点深度（从根节点到子节点），高度（从子节点到子节点所属最末尾节点）
// 只要没有子节点的就叫叶子



// 二叉搜索树的优势在于 logn  比o(n)更快  (必须具备可比较性)
// 左子树(比上一级节点小) 右子树（比上一级节点大）


// 树的遍历方式 4种
// 深度 （先遍历儿子）        广度 （先遍历兄弟）

// 前序  中序  后序 (一般递归 也可循环)          层序

// 前序（以根开始从上到下 先遍历左边）  / 斜杠这种方式 从上到下
// 中序（以叶子开始从下到上 先遍历左边）/ 斜杠这种方式 从下到上
// 后序（以叶子开始从下到上不遍历根 等下一级全部遍历完再遍历根， 从左往右依次）

// 广度 层序（从根节点为第一个开始 ，从上到下 一层一层遍历）——

class Node {
  constructor(element, parent){
    this.element = element
    this.parent = parent
    this.left = null
    this.right = null
  }
}



class bst {
  constructor (compare){
    this.root = null
    this.compare = compare || this.compare
  }
  compare(e1, e2){
    return e1 > e2
  }
  add(element){
    if(this.root == null) {
      this.root = new Node(element, this.root)
    }else {
      let current = this.root
      let compare,parent;
      while(current) {
        parent = current
        compare = this.compare(current.element, element)
        if (compare){
          current = current.left
        }else {
          current = current.right
        }
      }
      let node = new Node(element, parent)
      if (compare){
        parent.left = node
      }else {
        parent.right = node
      }
    }
  }
  prevoderTraversal(callback){
    function resverse(node){
      if(node === null)return
      callback()
      resverse(node.left)
      resverse(node.right)
    }
    resverse(this.root)
  }
  resversebst(){
    function resverse(node){
      if(node === null)return node
      let temp = node.left
      node.left = node.right
      node.right = temp
      resverse(node.left)
      resverse(node.right)
      return node
    }
    
    return resverse(this.root)
  }
  resversebt(){
    let queue = []
    queue.push(this.root)
    while(queue.length){
      let node = queue.shift()
      let temp = node.left
      node.left = node.right
      node.right = temp
      if(node.left !== null){
        queue.push(node.left)
      }
      if(node.right != null) {
        queue.push(node.right)
      }
    }
    return this.root
  }
}

let tree = new bst((e1,e2)=>{
  return e1.id > e2.id
})
tree.add({ id: 10, element: { name: 'zf1' } });
tree.add({ id: 8, element: { name: 'zf2' } });
tree.add({ id: 19, element: { name: 'zf3' } });
tree.add({ id: 6, element: { name: 'zf4' } });
tree.add({ id: 15, element: { name: 'zf5' } });
tree.add({ id: 22, element: { name: 'zf6' } });
tree.add({ id: 20, element: { name: 'zf7' } });

console.dir(tree.resversebt(), {depth: 100})




