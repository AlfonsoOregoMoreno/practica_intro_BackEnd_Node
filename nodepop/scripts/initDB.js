//Inicialización de la DB 
'use strict'; 

require('../lib/connectMongoose');

const mongoose = require('mongoose');
const { exists } = require('../models/Anuncio');
const Anuncio = require('../models/Anuncio'); 
const miJSON = require('../anuncios.json'); 

initDB(); 



// ----------------------------------------------------------------------
async function initDB () {
    console.log(' ===>> Vaciando la BBD ...'); 
    try {
      await Anuncio.deleteMany({});
      await Anuncio.insertMany(miJSON.todosLosAnuncios); 
      await process.exit(); 
    } catch (error) {
        console.log(`ERROR inicializando la BDD: (${error})`); 
    }
}
