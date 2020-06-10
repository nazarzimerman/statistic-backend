var express = require('express');
var router = express.Router();
var userStatistic = require('./userStatistic.js');

module.exports = function (db) {
    console.log(db);
    router.get('/', function (req, res, next) {
        console.log('in /users');
        let sql = `SELECT *  FROM userStatistic`;


        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows)
        });
    });

    router.get('/:id', function (req, res) {
        const a = userStatistic.find((el) => (el.id === Number(req.params.id)));
        res.send(a)
    });

    return router;
};