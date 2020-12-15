
// 树的遍历方式
// 深度（递归 先遍历儿子） 广度（循环 先遍历兄弟） 

// 树的遍历方式 有四种
// 前序（/型 从上到下） 中序（/型 从下到上） 后序（不遍历根（包括子节点） ，从下到上，） （循环）、层序（从上到下一层一层）
// 访问根元素的顺序

class Node {
    constructor(element, parent){
        this.element = element
        this.parent = parent
        this.left = null
        this.right = null
    }
}


class Tree {
    constructor(){
        this.root = null
    }

    compare(e1, e2){
        return e1 < e2
    }
    add (element){
        if (!this.root){
            this.root = new Node(element, this.root)
        } else {
            // 思路就是 找到需要放到最左边或者最右边节点
            let current = this.root
            let compare,parent;
            while(current) {
                compare = this.compare(current.element, element)
                parent = current
                if (!compare){
                    current = current.left
                }else {
                    current = current.right
                }
            }
            let node = new Node(element, parent)
            if (!compare){
                parent.left = node
            }else{
                parent.right = node
            }
        }
    }

    // 前序
    // prevoderTraversal(callback) {
    //     function traversal(node) {
    //         if (node == null)return
    //         callback(node)
    //         traversal(node.left)
    //         traversal(node.right)
    //     }
    //     traversal(this.root)
    // }
    // 前序
    prevoderTraversal(callback){
        let stack = []
        stack.push(this.root)
        while(stack.length){
            let node = stack.pop()
            callback(node)
            if (node.right != null){
                stack.push(node.right)
            }
            if (node.left != null){
                stack.push(node.left)
            }
        }
    }
    // 中序
    inoderTraversal(callback){
        function traversal(node) {
            if (node == null)return
            traversal(node.left)
            callback(node)
            traversal(node.right)
        }
        traversal(this.root)
    }
    // 后序
    postoderTraversal(callback){
        function traversal(node) {
            if (node == null)return
            traversal(node.left)
            traversal(node.right)
            callback(node)
        }
        traversal(this.root)
    }

    // 层序
    leveloaderTraversal(callback){
        let queue = []
        queue.push(this.root)
        while(queue.length){
            let node = queue.shift()
            callback(node)
            if (node.left != null){
                queue.push(node.left)
            }
            if(node.right != null) {
                queue.push(node.right)
            }
        }
    }

    // 树的反转 递归
    resverse(){
        function resver(node) {
            if (node == null)return node
            resver(node.left)
            resver(node.right)
            let temp = node.left
            node.left = node.right
            node.right = temp
            return node
        }
        return resver(this.root)
    }
    // 树的反转 循环
    resverseTree(){
        let queue = []
        queue.push(this.root)
        while(queue.length) {
            let node = queue.shift()
            let temp = node.left
            node.left = node.right
            node.right = temp
            if (node.left !== null) {
                queue.push(node.left)
            }
            if(node.right !== null){
                queue.push(node.right)
            }
        }
        return this.root
    }

}

let tree = new Tree()
tree.add(10)
tree.add(8)
tree.add(19)
tree.add(6)
tree.add(15)
tree.add(20)
tree.add(22)

// tree.prevoderTraversal((node)=>{
//     console.log(node.element)
// })
// console.log('-------')
// tree.leveloaderTraversal((node)=>{
//     console.log(node.element)
// })
console.dir(tree.resverseTree(), {depth: 100})
// console.log(tree)
// console.dir(tree, {depth: 100}) // node不能展开对象 所以有这个方法 浏览器不需要
