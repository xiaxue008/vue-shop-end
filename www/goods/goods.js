var express = require('express');
var router = express.Router();
const sqlhelper = require('./../../mysqlhandler');
const mdb = sqlhelper.db;

router.use('/getgoodslist', function (req, res) {
    var pageIndex = req.query.pageIndex
    let start = pageIndex * 6;
    var sqltext = `SELECT COUNT(*) FROM goodslist;select * from goodslist limit ${start},6`;

    mdb.query(sqltext, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let allcount = data[0][0]['COUNT(*)'] //获取总条数
            res.send({
                status: true,
                total: allcount,
                data: data[1]
            })
        }
    });
})

module.exports = router;