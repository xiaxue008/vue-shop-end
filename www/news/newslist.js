var express = require('express');
var router = express.Router();
const sqlhelper = require('./../../mysqlhandler');
const mdb = sqlhelper.db;

router.get('/newslist', function (req, res) {
    const sql='select * from newslist'
    mdb.query(sql,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send({
                status:true,
                data:data
            })
        }
    })
})


module.exports = router;