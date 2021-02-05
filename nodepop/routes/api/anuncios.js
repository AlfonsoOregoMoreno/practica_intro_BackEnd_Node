//Controlador de anuncios
var express = require('express');
var router = express.Router();

const Anuncio = require('../../models/Anuncio');

/* GET /api/anuncios */
// Listado de anuncios
router.get('/', async function(req, res, next) {
  try {

    const nombre = req.query.nombre;
    const venta = req.query.venta;

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;
    const filtro = {};

    if (nombre) {
      filtro.nombre = nombre; 
    }

    // if (venta) {
    //   filtro.venta = venta; 
    // }

    const resultado = await Anuncio.lista(filtro, limit, skip, fields, sort);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
});

// // GET /api/agentes:id
// // Obtener un agente
// router.get('/:id', async (req, res, next) => {
//   try {
//     const _id = req.params.id;

//     const agente = await Agente.findOne({ _id: _id });

//     if (!agente) {
//       return res.status(404).json({ error: 'not found' });
//     }
//     res.json({ result: agente });

//   } catch (err) {
//     next(err);
//   }
// });


// POST /api/anuncios (usando BODY)
// http method para crear un anuncio
router.post('/', async (req, res, next) => {
  try {
    const anuncioData = req.body;
    const anuncio = new Anuncio(anuncioData);
    const anuncioCreado = await anuncio.save();
    await anuncio.crear(anuncioData);
    res.status(201).json({ result: anuncioCreado });
  } catch (error) {
    next(error);
  }
});


// // PUT /api/agentes:id (body)
// // Actualizar un agente
// router.put('/:id', async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     const agenteData = req.body;

//     const agenteActualizado = await Agente.findOneAndUpdate({ _id: _id }, agenteData, { 
//       new: true,
//       useFindAndModify: false
//     });
//     // usamos { new: true } para que nos devuelva el agente actualizado

//     if (!agenteActualizado) {
//       res.status(404).json({ error: 'not found' });
//       return;
//     }

//     res.json({ result: agenteActualizado });
//   } catch (error) {
//     next(error);
//   }
// });


// // DELETE /api/agentes:id
// // Elimina un agente
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const _id = req.params.id;

//     await Agente.deleteOne({ _id: _id });

//     res.json();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;










//-------------------------------


// var express = require('express');
// var router = express.Router();

// const Anuncio = require('../../models/Anuncio'); 

// /* La petición sería: GET /api/anuncios */
// router.get('/', function(req, res, next) {
//     Anuncio.find(); 
//     res.send('respond with a resource');
// });

// /* router.get('/star', (req, res, next) => {
//   res.send('llamada a star')
// });
//  */

// module.exports = router;
