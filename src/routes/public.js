const { Router } = require('express');
const router = Router();
const MySQL = require('./../mysql/mysql');
const path = require('path');

// Rutas para el sitio web de Inicio de números
router.get('/tips', function(req, res) {
    var ruta = __dirname + '/../public/tips.html';
    res.sendFile(path.resolve(ruta));
});

router.get('/aprivacidad', function(req, res) {
    var ruta = __dirname + '/../public/aprivacidad.html';
    res.sendFile(path.resolve(ruta));
});

module.exports = router;