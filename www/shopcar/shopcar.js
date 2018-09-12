var express = require('express');
var router = express.Router();
const sqlhelper = require('./../../mysqlhandler');
const mdb = sqlhelper.db;

router.use('/shopcarlist', function (req, res) {
    if(req.session.username){
        console.log(req.session.username);
    }
    let sqlText = 'select * from shopcarinfo';
    mdb.query(sqlText, function (err, data) {
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    })
})

module.exports = router;