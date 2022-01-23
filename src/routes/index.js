const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', async (req, res) => {
    const products = await Product.find();
    console.log(products);
    res.render('index', {
        products
    });
});

router.post('/agregar', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findById(id);
    res.render('edit', {
        product
    });
});

router.post('/edit/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await Product.update({_id:id}, req.body);
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await Product.remove({
        _id: id
    });
    res.redirect('/');
});

module.exports = router;