var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  let user = {
    username: "asn@asn.com",
    password: "asn123456"
  }
  if (req.body.email === user.username && req.body.password === user.password){
      return res.status(200).json({
        message: "Auth successful"
      });
  }
  else
  {
    res.status(401).json({
      message: "Auth fail"
    });
  }
});

module.exports = router;