const express = require('express');
const router = express.Router();
const sqlhelper = require('./../../mysqlhandler');
const mdb = sqlhelper.db;

router.get('/:id', function (req, res) {
    let id = req.params.id;
    let start = (req.query.pageindex - 1) * 5;
    let total = null
    let sql1 = `SELECT COUNT(*) FROM commentinfo where id=${id};SELECT * FROM commentinfo where id=${id} limit ${start},5`;
    mdb.query(sql1, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let allcount = data[0][0]['COUNT(*)'] //获取总条数
            total = Math.ceil(allcount / 5);
            res.send({
                status: true,
                total: total,
                data: data[1]
            })
        }
    });
});

router.post('/postcom/:id', function (req, res) {
    let id = req.params.id;
    let msg = req.body.msg;
    let sqltext = `insert into commentinfo(id,username,addTime,content) values(${id},"text","20180820","${msg}")`;
    mdb.query(sqltext, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                status: true
            })
        }
    })
})


module.exports = router;