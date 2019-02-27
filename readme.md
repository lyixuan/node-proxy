# admin_app    项目介绍

技术选型:
* node 
* express  api模块
* http-proxy-middleware 中间件用于java接口转发
* connect-history-api-fallback 中间件用于处理静态页面使用history模式
* dva 目前是纯粹的数据流，和 umi 以及 roadhog 之间并没有相互的依赖关系，可以分开使用也可以一起使用
* 服务器使用pm2作为进程守护
* 

## 目录约定
```

--bin
   --www              //可执行文件
--public              //放置静态文件  
   --.tmp             //临时文件夹
   --bisys            //放置bi_admin项目静态页面(不做任何操作,为测试或线上环境部署预留,git已忽略)
   --inspector        //放置inspector项目静态页面(不做任何操作,为测试或线上环境部署预留,git已忽略)
--src                 //项目核心代码
   -- proxy           //接口转发模块 
   -- routes          //node内部api模块
--app.js              //项目的入口文件

```
## 使用

```bash
$ git clone [git地址]          //将项目clone至本地
$ cd [项目目录]
$ npm i
$ npm run start         // 选用测试环境启动,env=development
$ npm run start:pro     // 选用线上环境启动,env=production
$ npm run test          // 选用测试环境启动,可免重启应用修改代码
```

## 项目使用pm2作为项目的进程守护

```bash
$ sudo npm i pm2 -g      // 全局安装进程管理器
$ cd [项目目录]
$ pm2 start npm run start(start:pro,test) --name 'admin_app'   // 初次登录
$ pm2 start admin_app    // pm2 list 中已有admin_app进程
$ pm2 stop admin_app     // 关闭进程
$ pm2 delete admin_app   // 删除进程
$ pm2 list               // 可查看管理器中所以进程改
```
## 
