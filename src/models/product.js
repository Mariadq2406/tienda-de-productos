const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    producto: String,
    codigo: Number,
    precio: Number,
    fecha: Date,
    descripcion: String
});

module.exports = mongoose.model('products', ProductSchema);