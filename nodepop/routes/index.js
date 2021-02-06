var express = require('express');
var router = express.Router(); 

const Anuncio = require('../models/Anuncio'); 

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'NODEPOP (api de Anuncios)' });
// }); 

router.get('/', async function(req, res, next) {
  //console.log('En GET del raíz................')
  try {

      const nombre = req.query.nombre;
      const venta = req.query.venta;
      const precio = parseFloat(req.query.precio);
      const tags = req.query.tags; 

      const limit = parseInt(req.query.limit);
      const skip = parseInt(req.query.skip);
      const fields = req.query.fields;
      const sort = req.query.sort;
      
      const filtro = {};

      if (nombre) {
        filtro.nombre = nombre; 
      }

      if (venta) {
        filtro.venta = venta; 
      }

      if (precio) {
        filtro.precio = precio; 
      }

      if (tags) {
        filtro.tags = tags; 
      }

      const resultado = await Anuncio.lista(filtro, limit, skip, fields, sort);
      res.render('index', {title: 'NODEPOP (api de Anuncios)', resultSet: resultado});
  } catch (err) {
    next(err);
  }
});


module.exports = router;
