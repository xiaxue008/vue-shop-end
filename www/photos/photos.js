var express = require('express');
var router = express.Router();
const sqlhelper = require('./../../mysqlhandler');
const mdb = sqlhelper.db;

router.use('/phototitles', function (req, res) {
    let sql = "select * from photoinfo"
    mdb.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                status: true,
                data: data
            });
        }
    })
});

router.use('/photolist/:id', function (req, res) {
    let id = req.params.id;
    let sqltest = `select * from photos where uid=${id}`;
    mdb.query(sqltest, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
})

module.exports = router;