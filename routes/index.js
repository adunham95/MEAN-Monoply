var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/rules', function(req, res, next) {
    res.json({
        rules: {
          maxPlayers: 4,
          initialMoney: 100
        }
    });
});

module.exports = router;
