const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    producto: String,
    precio: Number,
    descripcion: String
});

module.exports = mongoose.model('products', ProductSchema);