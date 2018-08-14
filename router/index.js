module.exports=function (app) { 
    //登录模块
    var login=require('./../www/users/login');
    app.use('/users',login);

    var news=require('./../www/news/newslist');
    app.use('/news',news);
 }