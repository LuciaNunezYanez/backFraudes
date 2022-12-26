// http: //10.11.127.70:8081/estadistica/2022-11-10/2022-11-21/8


const { Router } = require('express');
const router = Router();
const MySQL = require('./../mysql/mysql');

router.get('/:fecha1/:fecha2', function(req, res) {

    var fecha1 = MySQL.instance.cnn.escape(req.params.fecha1);
    var fecha2 = MySQL.instance.cnn.escape(req.params.fecha2);
    var query = `CALL getEstadisticaFecha(${fecha1},${fecha2})`;

    MySQL.ejecutarQueryPr(query).then((results) => {
        res.json({
            registros: results[0]
        });
    }).catch(() => {
        res.status(500).json({
            error: 'Error de servidor (DB).'
        });
    });
});

router.get('/:fecha1/:fecha2/:operador', function(req, res) {

    var fecha1 = MySQL.instance.cnn.escape(req.params.fecha1);
    var fecha2 = MySQL.instance.cnn.escape(req.params.fecha2);
    var operador = MySQL.instance.cnn.escape(req.params.operador);

    var query = `CALL getEstadisticaOperad(${fecha1},${fecha2},${operador})`;

    MySQL.ejecutarQueryPr(query).then((results) => {
        res.json({
            registros: results[0]
        });
    }).catch(() => {
        res.status(500).json({
            error: 'Error de servidor (DB).'
        });
    });
});

module.exports = router;