var express = require('express');
var router = express.Router();

module.exports = function (db) {
    console.log(db);
    router.get('/', function (req, res, next) {
        console.log(req.query.page);
        const page = req.query.page || 0;
        const limit = req.query.limit || 50;
        let offset = page * limit;

        let countQuery = `SELECT count(*) as rowCount from (SELECT id FROM  user INNER JOIN userStatistic
         ON user.id = userStatistic.user_id GROUP BY id)`;

        let pageQuery = `SELECT id, first_name, last_name, email, gender, ip_address,  SUM (clicks) AS clicks, SUM ( page_views) AS page
         FROM (SELECT * FROM  user INNER JOIN userStatistic
         ON user.id = userStatistic.user_id)  GROUP BY id LIMIT ${limit} OFFSET ${offset}`;

        db.all(countQuery, [], (err, count) => {
            if (err) {
                throw err;
            }
            db.all(pageQuery, [], (err, rows) => {
                if (err) {
                    throw err;
                }
                res.send({rows, count: count[0].rowCount})
            });
        });


    });

    router.get('/:id', function (req, res) {
        let id = req.params.id;
        let dateFrom = req.query.dateFrom;
        let dateTo = req.query.dateTo;

        let sql = `SELECT * FROM userStatistic WHERE user_id =${id} `;
        if (dateFrom) {
            sql = sql + ` AND date >= date("${dateFrom}")`;
        }
        if (dateTo) {
            sql = sql + ` AND date <= date("${dateTo}")`;
        }

        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows)
        });

    });

    return router;
};