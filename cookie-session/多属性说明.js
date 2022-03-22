// cookie: 保存在客户端，客户端和服务端都可以设置cookie 保存用户信息、用户标识、一些不重要的信息、购物车  大小4k限制 
// session：保存在服务端，服务端设置session session是基于cookie的 seesion很安全，保存一些重要信息
// localStorage: 客户端本地存储 存储在浏览器的仓库中，不清除不失效，可以保存一些静态资源， 大小5m
// sessionStorage: 客户端，关闭页面就没了、页面间传值可以用到

// servers-worker: 保存一些不重要的资源在浏览器，资源储存在cache中，安装后只能手动清除，
// 主要用于离线 离线内容开发者可控，必须是https才能工作，


// cookie 中httponly属性 设置之后客户端是不能获取编辑cookie
// cookie 中httphostonly属性 设置之后其它子域名拿不到cookie

// 移动端fille：// 协议是不存在跨域问题的