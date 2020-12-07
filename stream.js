let {Readable} = require('stream') // 可读流接口

// Readable 父类有一个read方法

class MyReadStram extends Readable {
  _read(){
    
  }
}

let myStream = new MyReadStram()




