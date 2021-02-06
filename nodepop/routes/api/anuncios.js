//Controlador de anuncios
var express = require('express');
const { mongo, connection } = require('mongoose');
var router = express.Router();

const Anuncio = require('../../models/Anuncio');

/* GET /api/anuncios */
// Listado de TODOS los anuncios, salvo que se indiquen filtros
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
        res.json(resultado);
    } catch (err) {
      next(err);
    }
});


// GET sobre ruta /api/anuncios/precio/:precio
// Obtener un anuncio indicando el precio
router.get('/precio/:precio', async (req, res, next) => {
  try {
      const anuncio = await Anuncio.findOne({ precio: req.params.precio }); 
      if (!anuncio) {
        return res.status(404).json({ error: 'SIN RESULTADOS' });
      }
      res.json({ result: anuncio });
  } catch (err) {
    next(err);
  }
});


// GET sobre ruta /api/anuncios/tags
// Obtener lista de todos los tags
router.get('/tags', async (req, res, next) => {
  try {
    //const miSchema = mongo.model('Anuncio', anuncioSchema);
    //miSchema.query
      //const query = await Anuncio.find({tags:'motor'}); 
      //const query = await Anuncio.find({fields: 'tags'}); 
      const query = await Anuncio.find({venta: false}); 
      
      console.log(query)
      console.log(Anuncio.distinct('tags') )
      //Anuncio.find()
      //query.select(tags)
      //const miQueryResult = query.ex
      ////////////////////////////////console.log('query.D: ' +  query.distinct('tags') ); 
      //console.log(Anuncio.collection.getName())

      // let arrTags = []; 
      // for (anuncioObj of query){
      //   console.log('TAGS: ' + anuncioObj.tags); 
      //   arrTags.dis
      // }      
        
      //console.log('TAGS: ' + Anuncio.collection("anuncios").distinct("tags"))
      if (!query) {
        return res.status(404).json({ error: 'SIN RESULTADOS' });
      }
      //console.log('query: ' + query.select('tags') ); 
      //console.log('query: ' + query ); 
      //res.json({ result: query });
      res.json({ result: Anuncio.distinct('tags') });
  } catch (err) {
    next(err);
  }
});


// POST sobre ruta /api/anuncios (usando BODY)
// Crear un anuncio
router.post('/', async (req, res, next) => {
    //console.log('En POST del raiz...............'); 
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


// DELETE sobre ruta /api/anuncios
// Borra todos los anuncios
router.delete('/', async (req, res, next) => {
    //console.log('En DELETE todos >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    try {
      await Anuncio.deleteMany({});  
      res.json();
    } catch (error) {
      next(error);
    }
});

module.exports = router;
