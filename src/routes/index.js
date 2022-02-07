const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const passport = require('passport');
const Product = require('../models/product');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', passport.authenticate('local-signin', {
    successRedirect:'/profile',
    failureRedirect:'/',
    passReqToCallback: true
}));

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect:'/profile',
    failureRedirect:'/signup',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', isAuthenticated, async (req, res) => {
    const products = await Product.find();
    console.log(products);
    res.render('profile', {
        products
    });
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

router.get('/products', isAuthenticated, async (req, res) => {
    const products = await Product.find();
    console.log(products);
    res.render('products', {
        products
    });
});

router.post('/agregar', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/profile');
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
    res.redirect('/profile');
});

router.get('/delete/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await Product.remove({
        _id: id
    });
    res.redirect('/profile');
});

module.exports = router;