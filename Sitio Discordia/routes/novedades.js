var express = require('express');
var router = express.Router();
var novedadesmodel = require('./../models/novedadesmodel');


router.get('/', async function (req, res, next) {

    var novedades = await novedadesmodel.getNovedades();

    res.render('novedades', {
        isNosotros: true,
        novedades
    });
});

module.exports = router;
