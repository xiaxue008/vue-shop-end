module.exports = function (app) {
    //登录模块
    var login = require('./../www/users/login');
    app.use('/users', login);

    var news = require('./../www/news/newslist');
    app.use('/news', news);

    var comment = require('./../www/comment/comment');
    app.use('/comments', comment);

    var photos = require('./../www/photos/photos');
    app.use('/photos', photos);

    var goods = require('./../www/goods/goods')
    app.use('/goods', goods);

    var shopcar = require('./../www/shopcar/shopcar');
    app.use('/shopcar', shopcar);
}