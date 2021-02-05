'use strict'; 

//const { NotFound } = require('http-errors');
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

module.exports = mongoose.connection;
