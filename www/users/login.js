var express = require('express');
var router = express.Router();
const sqlhelper = require('./../../mysqlhandler');

const mdb = sqlhelper.db;

router.post('/login', function (req, res) {
    let userinfo = req.body;
    var sql = `select * from userinfo where username="${userinfo.username}"`;
    //需要验证用户名和密码
    mdb.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let result=validata(userinfo,data[0]);
            res.send(result);
        }
    })
})

function validata(postuser, dbuser) {
    //格式这里不做验证
    let result={};
    if(postuser.password!==dbuser.userpass){
        result.status=false;
        result.errMsg='用户名密码不符';
    }else{
        result.status=true
    }
    return result;
}

module.exports = router;