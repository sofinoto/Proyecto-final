var express = require('express');
var router = express.Router();
var novedadesmodel = require('../../models/novedadesmodel');

router.get('/', async function (req, res, next) {

//var novedades = await novedadesmodel.getNovedades();
  
var novedades
if (req.query.q === undefined) {
    novedades = await novedadesmodel.getNovedades();
} else {
    novedades =await novedadesmodel.buscarNovedades(req.query.q);
}

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades,
        is_search: req.query.q !== undefined,
        q: req.query.q
    });
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesmodel.deleteNovedadesById(id);
    res.redirect('/admin/novedades');
})

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesmodel.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la novedad'
        })
    }
});


router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    console.log(req.params.id);
    var novedad = await novedadesmodel.getNovedadById(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    })
});


router.post('/modificar', async (req, res, next) => {
    try {
        console.log(obj)
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
        }
await novedadesmodel.modificarNovedadById(obj, req.body.id);
res.redirect('/admin/novedades');

   } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico la novedad'
        })
    }
})

module.exports = router; 