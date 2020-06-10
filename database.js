var sqlite3 = require('sqlite3').verbose();
var users = require('./users');
var statistic = require('./users_statistic');

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL, 
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE, 
            gender TEXT NOT NULL, 
            ip_address TEXT NOT NULL
            )`,
            (err) => {
                if (err) {
                    console.log('Cannot create table user: ', err);
                } else {
                    var insert = 'INSERT INTO user (id, first_name, last_name, email, gender, ip_address) VALUES (?,?,?,?,?,?)';
                    for (let i = 0; i < users.length; i++) {
                        db.run(insert, [users[i].id, users[i].first_name, users[i].last_name, users[i].email, users[i].gender, users[i].ip_address]);
                    }
                }
            });
        db.run(`CREATE TABLE userStatistic ( 
                            user_id INTEGER,
                            date TEXT NOT NULL,
                            page_views INTEGER NOT NULL,
                            clicks INTEGER NOT NULL
                            )`, (err) => {
            if (err) {
                console.log('Cannot create user statistic table: ', err);
            } else {
                var insert = 'INSERT INTO userStatistic ( user_id, date, page_views, clicks) VALUES (?,?,?,?)';
                for (let i = 0; i < statistic.length; i++) {
                    db.run(insert, [statistic[i].user_id, statistic[i].date, statistic[i].page_views, statistic[i].clicks], err => {
                        if (err){
                            console.log('Cannot input database')
                        }
                    });
                }
            }
        })
    }
});


module.exports = db;