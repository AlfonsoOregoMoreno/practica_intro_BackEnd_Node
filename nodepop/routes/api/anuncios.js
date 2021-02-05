//Controlador de anuncios
var express = require('express');
var router = express.Router();

const Anuncio = require('../../models/Anuncio');

/* GET /api/anuncios */
// Listado de anuncios
router.get('/', async function(req, res, next) {
  console.log('En GET del raíz................')
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


// GET /api/agentes:precio
// Obtener un agente
router.get('/precio/:precio', async (req, res, next) => {
  try {
    const anuncio = await Anuncio.findOne({ precio: req.params.precio }); 

    if (!anuncio) {
      return res.status(404).json({ error: 'NO SE HA ENCONTRADO EL ANUNCIO' });
    }
    res.json({ result: anuncio });

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
    console.log('En POST del raiz...............'); 
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

// // DELETE /api/anuncios:id
// router.delete('/:id', async (req, res, next) => {
//     console.log('En DELETE')
//     try {
//       const _id = req.params.id;
  
//       //await Agente.deleteOne({ _id: _id });
//       await Anuncio.deleteOne({ _id: _id });
  
//       res.json();
//     } catch (error) {
//       next(error);
//     }
// });
  
// // DELETE /api/anuncios/:nombre
// router.delete('/:nom', async (req, res, next) => {
//     console.log('En DELETE por nombre')
//     try {
//       const nom = req.params.nom;
//       //cont nom02 = req.params.no
  
//       await Anuncio.deleteOne({ nombre: nom });
  
//       res.json();
//     } catch (error) {
//       next(error);
//     }
// });

// DELETE /api/anuncios/:nombre
router.delete('/TODOS', async (req, res, next) => {
    console.log('En DELETE todos >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    try {
      //const nom = req.params.nom;
      //cont nom02 = req.params.no
  
      await Anuncio.deleteMany({});
  
      res.json();
    } catch (error) {
      next(error);
    }
});

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
