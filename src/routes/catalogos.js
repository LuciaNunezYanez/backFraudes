const { Router } = require('express');
const router = Router();
const MySQL = require('./../mysql/mysql');

// Obtiene todos los números
// Para consumirse en la app
// router.get('/:municipio', function(req, res) {

//     var numero = MySQL.instance.cnn.escape(req.params.numero);
//     var query = "CALL searchNumero(" + numero.trim() + ")";

//     MySQL.ejecutarQueryPr(query).then((results) => {
//         // console.log(results[0].length);
//         res.json({
//             numeros: results[0]
//         });
//     }).catch(() => {
//         res.status(500).json({
//             error: 'Error de servidor (DB).'
//         });
//     });
// });


module.exports = router;