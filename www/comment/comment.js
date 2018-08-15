const express = require('express');
const router = express.Router();
const sqlhelper = require('./../../mysqlhandler');
const mdb = sqlhelper.db;

router.get('/:id', function (req, res) {
    let id = req.params.id;
    let start = req.query.pageindex-1;
    let total = null
    let sql1 = `SELECT COUNT(*) FROM commentinfo;SELECT * FROM commentinfo limit ${start},5`;
    mdb.query(sql1, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let allcount = data[0][0]['COUNT(*)'] //获取总条数
            total = Math.ceil(allcount / 5);
            res.send({
                status:true,
                total:total,
                data:data[1]
            })
        }
    });

})


module.exports = router;