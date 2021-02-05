'use strict';

const mongoose = require('mongoose');

// Esquema para los anuncios
const anuncioSchema = mongoose.Schema({
  nombre: { type: String, index: true },
  venta: Boolean,
  precio: Number 

            /*   age: { type: Number, index:true }, // age: { type: Number}
            multado: Boolean,
            image: String
            */

    }, {  collection: 'anuncios'}
);

anuncioSchema.statics.lista = function(filtro, limit, skip, fields, sort) {
    const query = Anuncio.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
  }
  
/* // En los métodos de mongoose no usar Arrow Functions
agenteSchema.statics.lista = function(filtro, limit, skip, fields, sort) {
  const query = Agente.find(filtro);
  query.limit(limit);
  query.skip(skip);
  query.select(fields);
  query.sort(sort);
  return query.exec();
}
 */


  
anuncioSchema.methods.crear = function(miBody) {
  //console.log('En CREAR')
  this.nombre = miBody.nombre; 
  this.venta = miBody.venta;  
  this.precio = miBody.precio;  
  return this.save();
}


const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
