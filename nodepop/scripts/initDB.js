//Inicialización de la DB 

'use strict'; 

const mongoose = require('mongoose'); 

mongoose.connection.on('error', err => {
    console.log('====================>> ERROR de conexión!!!', err);
    process.exit(1);
  });
  
mongoose.connection.once('open', () => {
    console.log('Conectado OK a MongoDB en', mongoose.connection.name);
});
  
//mongoose.connect('mongodb://localhost/databases/nodepopDB', {
mongoose.connect('mongodb://localhost/anuncios', {
    useNewUrlParser: true,
    useUnifiedTopology: true  
}); 


var express = require('express');
var router = express.Router();

//const Anuncio = require('../../models/Anuncio');
const Anuncio = require('../models/Anuncio'); 

router.post()




module.exports = mongoose.connection; 



