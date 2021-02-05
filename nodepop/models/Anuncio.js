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


  
anuncioSchema.methods.crear = function() {
  //this.multado = true;
  this.nombre = "Nom01"; 
  this.venta = true; 
  this.precio = 101; 

  return this.save();
}


// creamos el modelo con el esquema definido
const Anuncio = mongoose.model('Anuncio', anuncioSchema);
//const Agente = mongoose.model('Agente', agenteSchema);

module.exports = Anuncio;
