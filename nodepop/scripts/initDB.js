//Inicialización de la DB 
'use strict'; 

require('../lib/connectMongoose');

const mongoose = require('mongoose');
const { exists } = require('../models/Anuncio');
const Anuncio = require('../models/Anuncio'); 

deleteAllDocs(); 

let fs = require("fs"); 
const misAnunciosJSON = fs.readFileSync('anuncios.json', 'utf-8'); 
//console.log('mis: ' + misAnunciosJSON)
const misAnuncios = JSON.parse(misAnunciosJSON); 
const arrAnuncios = misAnuncios.todosLosAnuncios; 
for (let anuncio of arrAnuncios){
    let unNuevoObjAnuncio = new Anuncio(anuncio); 
    unNuevoObjAnuncio.save(); 
} 

//process.exit(); 

// -------------------

async function deleteAllDocs () {
    try {
      await Anuncio.deleteMany({});
    } catch (error) {
        console.log('ERROR en deleteAllDocs >>>>>>'); 
    }
}
