const { Router } = require('express');
const router = Router();
const MySQL = require('./../mysql/mysql');

// Obtiene todos los números
// Para consumirse en la app
router.get('/:numero', function(req, res) {

    var numero = MySQL.instance.cnn.escape(req.params.numero);
    var query = "CALL searchNumero(" + numero.trim() + ")";

    MySQL.ejecutarQueryPr(query).then((results) => {
        // console.log(results[0].length);
        res.json({
            numeros: results[0]
        });
    }).catch(() => {
        res.status(500).json({
            error: 'Error de servidor (DB).'
        });
    });
});

router.get('/fecha/:fecha', function(req, res) {

    var fecha = MySQL.instance.cnn.escape(req.params.fecha);
    var query = "CALL searchNumeroByFecha(" + fecha.trim() + ")";

    MySQL.ejecutarQueryPr(query).then((results) => {
        // console.log(results[0].length);
        res.json({
            numeros: results[0]
        });
    }).catch(() => {
        res.status(500).json({
            error: 'Error de servidor (DB).'
        });
    });
});


router.post('/agregar', function(req, res) {
    // console.log(req.body);
    var query = `CALL addNumero(
        ${MySQL.instance.cnn.escape(req.body.telefono)},
        ${req.body.entidad},
        ${req.body.municipio},
        ${req.body.identidad},
        ${req.body.extorsion},
        ${MySQL.instance.cnn.escape(req.body.extorsionotro)},
        ${req.body.usuario})`;

    MySQL.ejecutarQueryPr(query).then((results) => {
        res.json({
            ok: true,
            telefono: req.body.telefono,
            mensaje: `Éxito al registrar número telefónico`,
            resp: results[0][0]
        });
    }).catch((e) => {
        if (e.sqlMessage.includes('Duplicate')) {
            res.json({
                ok: false,
                telefono: req.body.telefono,
                mensaje: 'Número duplicado'
            });
        } else {
            res.json({
                ok: false,
                telefono: req.body.telefono,
                mensaje: 'Ocurrio un error en el servidor',
                resp: e
            });
        }


    });
});




// Para consumirse web  CALL searchNumeroByFecha('2022-10-14');
router.get('/w/:numero', function(req, res) {

    var numero = MySQL.instance.cnn.escape(req.params.numero);
    var query = "CALL searchNumero(" + numero.trim() + ")";

    MySQL.ejecutarQueryPr(query).then((results) => {
        // console.log(results[0].length);
        res.json(
            results[0]
        );
    }).catch(() => {
        res.status(500).json({
            error: 'Error de servidor (DB).'
        });
    });
});

router.get('/w/fecha/:fecha', function(req, res) {

    var fecha = MySQL.instance.cnn.escape(req.params.fecha);
    var query = "CALL searchNumeroByFecha(" + fecha.trim() + ")";

    MySQL.ejecutarQueryPr(query).then((results) => {
        // console.log(results[0].length);
        res.json(
            results[0]
        );
    }).catch(() => {
        res.status(500).json({
            error: 'Error de servidor (DB).'
        });
    });
});


module.exports = router;