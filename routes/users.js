var express = require('express');
var router = express.Router();
var users = require('../users.json');

router.get('/', function (req, res, next) {
    res.send(users);
});

router.get('/:id', function (req, res) {
    const a = users.find((el) => (el.id === Number(req.params.id)));
    res.send(a)
});

module.exports = router;
