const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const querystring = require("querystring");

// cookie参数
// key/value/domain/path/maxAge/expires/httpOnly

// key value键值对
// domain 限制域名 默认是当前域名
// path 限制cookie的路径（基本没人设置）
// maxAge（多少秒失效） expires 确切的时间
// httpOnly 防xss攻击 客户端不能操作cookie（js取不到了编辑不了）

let key = "jack";
function signed(value) {
  // 比md5 多了一个盐值
  return crypto
    .createHmac("sha256", key)
    .update(value.toString())
    .digest("base64");
}

const Server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  console.log(pathname);
  let cookies = [];
  res.setCookie = function (key, value, options) {
    let optArgs = [];
    if (options.maxAge) {
      optArgs.push(`maxAge=${options.maxAge}`);
    }
    if (options.path) {
      optArgs.push(`path=${options.path}`);
    }
    if (options.httpOnly) {
      optArgs.push(`httpOnly=${options.httpOnly}`);
    }
    if (options.signed) {
      // 如果加密那就. 后面加加密内容
      value = value + "." + signed(value);
    }
    let cookieValue = `${key}=${value}`;
    cookies.push(`${cookieValue}; ${optArgs.join("; ")}`);
    res.setHeader("Set-Cookie", cookies);
  };
  res.getCookie = function (key, options = {}) {
    let cookieObj = querystring.parse(res.headers["cookie"], "; ");
    if (options.signed) {
      let [value, sign] = cookieObj[key].split(".");
      if (signed(value) == sign) {
        return value;
      } else {
        return "";
      }
    } else {
      if (cookieObj[key]) {
        return cookieObj[key].split(".")[0];
      } else {
        return "";
      }
    }
  };

  const filePath = path.join(__dirname, pathname);
  if (req.url === "/read") {
    // a=b; c=d  => {}
    let value = req.getCookie("age", { signed: true });
    res.end(value); // 拿到的直接返回
  } else if (req.url === "/write") {
    res.setCookie("name", "jack", { maxAge: 10 });
    res.setCookie("age", 10, { httpOnly: true, signed: true });
    //   res.setHeader('Set-Cookie',['name=jk; path="/write"; max-age=10','age=10; httpOnly=true']);
    res.end();
  }
  // fs.stat(filePath, function (err,stats) {
  //     if(err){
  //         res.statusCode = 404
  //         res.end()
  //     }else{
  //         if (stats.isFile()){
  //             res.setHeader('Set-Cookie',['name=zf; max-age=10','age=10; path="/"; httpOnly=true']);
  //             res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf-8`)
  //             fs.createReadStream(filePath).pipe(res)
  //         }
  //     }
  // })
});
let port = 3000;
Server.listen(port, function () {
  console.log("启动成功");
});
Server.on("error", function (err) {
  if ((err.errno = "EADDRINUSE")) {
    // 端口冲突
    Server.listen(++port);
  }
});
