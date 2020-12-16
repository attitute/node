
// 自定义需要显示到命令行中的命令

const config = { 
    'port': {
        option: '-p, --port <n>', // <n> 表示是一个值
        descriptor: 'set your server port',
        default: 8080,
        usage: 'my-http-server --port <n>'
    },
    'directory': {
        option: '-d, --directory <n>',
        descriptor: 'set your server start directory',
        default: process.cwd(), // 默认当前工作目录
        usage: 'my-http-server --directory <n>'
    },
    'cache': {
        option: '-c, --cache <n>',
        descriptor: 'set your server cache',
        default: 'no-cache',
        usage: 'my-http-server --cache <n>'
    }
}

module.exports = config

