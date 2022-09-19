var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('tienda',{
    isTienda:true
  });
});

module.exports = router;
