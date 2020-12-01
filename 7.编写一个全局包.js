

// 编写一个全局包 

// 1.package.json中申明  bin配置 配置命令与启动文件
// 2.需要给对应文件增加 #！指定环境 #! /user/bin/env node
// 3.npm link 可以做连接 将本地代码先暂时的连接到全局下

// 4.切换到官方npm下 不能使用镜像了
// 5.登录账号 npm addUser
// 6.npm publish 发包 （可以在文件夹内添加.npmignore文件忽略一些文件的上传）
// 7.npm install 安装你发的包
// 8.npm unpublish 卸载刚刚发的包
// 9.升级包需要更新版本号
// 10.24小时之内不能重新发布



// package-lock.json 锁定版本

// 依赖分为 开发依赖（-D）项目依赖（-S）同版本依赖(package.json中配置peerDependencies)
// 捆绑依赖(package.json中配置bundledDependencies) 运行npm pack 时会打包进压缩文件


// 版本问题 
// ^ ~ >= <=
// ^2.0.0 2版本以上 3版本以下 semver规范 major.minor.patch (大版本.小版本.补丁版本)
// ~1.2.0 只能比1.2>= 不能大于1.3 



// npm run test run的作用就是将当前文件夹node_modules 下的bin目录添加在path中全局 临时的

// npm install mime 包可以检测当前文件类型

// npx 比npm 多一个下载功能 下载完运行后就自动删除了
// npx就是方便 node5.2之后赠送的

// rm -rf 安装git时选择支持linux命令