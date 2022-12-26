const { Router } = require('express');
const router = Router();
const MySQL = require('../mysql/mysql');



router.post('/login', function(req, res) {

    var query = `SELECT * FROM usuarios WHERE
    usuario = ${MySQL.instance.cnn.escape(req.body.usuario)} AND 
    contrasena = ${MySQL.instance.cnn.escape(req.body.contrasena)} AND 
    estatus = 1 LIMIT 1;`

    MySQL.ejecutarQueryPr(query).then((results) => {
        res.json({
            ok: true,
            mensaje: 'Éxito al iniciar sesión',
            usuario: {
                id_usuario: results[0].id_usuario,
                nombre_usuario: results[0].usuario,
                tipo_usuario: results[0].tipo_usuario
            }
        });
    }).catch((e) => {
        res.json({
            ok: false,
            mensaje: 'Ocurrio un error en el servidor',
            resp: e
        });


    });
});

// Obtener los operadores
// http://10.11.127.70:8081/login/operadores
router.get('/operadores', function(req, res) {

    var query = `SELECT id_usuario, nombre_usuario, usuario FROM usuarios;`

    MySQL.ejecutarQueryPr(query).then((results) => {
        res.json({
            ok: true,
            operadores: results
        });
    }).catch((e) => {
        res.json({
            ok: false,
            mensaje: 'Ocurrio un error en el servidor',
            resp: e
        });


    });
});



module.exports = router;