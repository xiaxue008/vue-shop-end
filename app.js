const express = require('express');
const routes = require('./router/index');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cookieParser('secret'));
// 使用 session 中间件
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //为了跨域保持session，所以指定地址，不能用*
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "xtoken");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type,xtoken'); //设置token  可以跨域添加请求header---自定义header
    res.header('Access-Control-Allow-Credentials', true);
    if (req.url !== "/users/login") {
        var xtoken = req.headers.xtoken;
        var at = jwt.decode(xtoken)
        console.log(at);
        next();
    } else {
        next();
    }
});

routes(app);

app.listen(3000);