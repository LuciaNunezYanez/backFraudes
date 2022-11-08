const { Router } = require('express');
const router = Router();
const MySQL = require('./../mysql/mysql');



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



module.exports = router;