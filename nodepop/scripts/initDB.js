//Inicialización de la DB 
'use strict'; 

const { NotFound } = require('http-errors');
require('../lib/connectMongoose');

const A = require('../models/Anuncio'); 
const Anuncio = require('../models/Anuncio'); 
const miAnuncio = new A(); 

let fs = require("fs"); 
//const misAnuncios_json = fs.readFile('anuncios.json', 'utf-8', miCallback); 
//let misAnuncios
const misAnuncios_json = fs.readFileSync('anuncios.json', 'utf-8'); 
const misAnuncios = JSON.parse(misAnuncios_json); 


// console.log(misAnuncios.anuncios)
const arrAnuncios = misAnuncios.anuncios; 


for (let anuncio of arrAnuncios){
    console.log(anuncio); 
    let unNuevoObjAnuncio = new A(anuncio); 
    unNuevoObjAnuncio.save(); 
    // console.log(unNuevoObjAnuncio); 
} 

//process.exit(); 


//router.post()


// module.exports = mongoose.connection; 

// --------------------------

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



//var express = require('express');
//var router = express.Router();

//const Anuncio = require('../models/Anuncio'); 


// let arrAnuncios = misAnuncios_json.anuncios; 

//let json_file = FileAttachment('anuncios.json').json()

// const arrAnunciosOLD = [
//     // {nombre: "miNom01", venta: true, precio: 11}, 
//     // {nombre: "miNom02", venta: true, precio: 12}, 
//     {nombre: "miNom03", venta: true, precio: 13}
//     ]; 

// miAnuncio.delete()
//miAnuncio.q

// function miCallback(err, anuncios){
//     if (err)
//         console.log('=============================' + err)
//     else    
//         console.log('====================== MIS ANUNCIOS: ' + anuncios)
// }
