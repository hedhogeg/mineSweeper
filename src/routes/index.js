const e = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main');
});

router.get('/game', function(req, res, next) {
  if (!req.query.row || !req.query.col || !req.query.mine) {
    res.redirect('/')
  } else {
    res.render('game')
  }
});

module.exports = router;
