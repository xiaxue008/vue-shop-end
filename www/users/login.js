var express = require('express');
var router = express.Router();
const sqlhelper = require('./../../mysqlhandler');
const mdb = sqlhelper.db;

//处理登录的逻辑
router.post('/login', function (req, res) {
    let userinfo = req.body;
    var sql = `select * from userinfo where username="${userinfo.username}"`;
    //需要验证用户名和密码
    mdb.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let result = validata(userinfo, data[0]);
            res.send(result);
        }
    })
})

//处理注册的逻辑
router.post('/register', function (req, res) {
    let userinfo = req.body;
    //第一步 首先查看存在该用户
    var sql = `select * from userinfo where username="${userinfo.username}"`;
    mdb.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            if (data.length > 0) {
                let result = {
                    status: false,
                    errMsg: '该用户已被注册'
                }
                res.send(result);
            } else {
                registerInfo(userinfo, res);
            }
        }
    })
})

function registerInfo(userinfo, res) {
    var sql = `insert into userinfo(username,userpass,usestate) values("${userinfo.username}","${userinfo.userpass}",0)`;
    mdb.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let result = {
                status: true
            }
            res.send(result);
        }
    })
}


function validata(postuser, dbuser) {
    //格式这里不做验证
    let result = {};
    if (postuser.password !== dbuser.userpass) {
        result.status = false;
        result.errMsg = '用户名密码不符';
    } else {
        result.status = true
    }
    return result;
}

module.exports = router;