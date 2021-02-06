'use strict';

const mongoose = require('mongoose');

// Esquema para los anuncios
const anuncioSchema = mongoose.Schema({
        nombre: { type: String, index: true },
        venta: Boolean,
        precio: Number, 
        foto: String, 
        tags: [ String ]
    }, 
    {  collection: 'anuncios'}
);

anuncioSchema.statics.lista = function(filtro, limit, skip, fields, sort) {
    const query = Anuncio.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}
  
anuncioSchema.methods.crear = function(miBody) {
    console.log('En CREAR, de anuncioSchema'); 
    this.nombre = miBody.nombre; 
    this.venta = miBody.venta;  
    this.precio = miBody.precio;  
    this.foto = miBody.foto; 
    this.tags = miBody.tags; 
    return this.save();
}
    
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
