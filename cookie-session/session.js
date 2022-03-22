const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const uuid = require('uuid')
const querystring = require("querystring");

// session 
// 主要是对cookie的封装 
// 将数据储存在session中 
// 每次浏览器获取数据 就对session中的唯一标识进行比对
// 如果比对成功即可获取数据 不成功重新分配数据

let key = "jack";
function signed(value) {
  // 比md5 多了一个盐值
  return crypto
    .createHmac("sha256", key)
    .update(value.toString())
    .digest("base64");
}
const session = {}
const CardName = 'connect.sid' // 标识名

const Server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = path.join(__dirname, pathname);
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

  if (req.url === '/cut') {
      let cardId = req.getCookie(CardName);
      if (cardId && session[cardId]) { // 服务器一旦重启 session就被清空了
          session[cardId].mny -= 20;
          res.end(session[cardId].mny + ` money`)
      } else { // 第一次来  uuid 
          let cardId = uuid.v4(); // MathRandom + date 
          session[cardId] = { mny: 100 };
          res.setCookie(CardName, cardId, { httpOnly: true });
          res.end(`100 money`)
      }
  } else {
      res.end();
  }
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
