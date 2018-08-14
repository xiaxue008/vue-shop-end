# 这是一个vue项目的服务端

## 第一天：搭建开发环境 使用node+express+mysql  
步骤：  
- 1：首先安装express 没什么好说的
- 2：新建一个app.js用于项目入口 内部监听3000端口号
- 3：由于我们前端端口号是8080，所以这里涉及到跨域需要配置请求的header  
~~~
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //为了跨域保持session，所以指定地址，不能用*
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
~~~  


## 第二天：实现路由分发，实现登陆 注册模块  
步骤：首先实现路由分发，由于后期模块会增多，所有的请求都写在app.js中会显得臃肿和难以维护，所以这里我们是有路由来进行控制
- 1：首先新建router文件夹，下面新建index.js用作项目路由入口
- 2：在app.js中引入index.js暴露出来的模块并使用
~~~
var routes = require('./router/index');
-----------其他代码
routes(app);