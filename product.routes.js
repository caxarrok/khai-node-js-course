const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// Additional task: get one product by id (path /product/:id)
router.get('/product/:id', (request, response) => {
   const id = Number(request.params.id); // route parameters are strings
   const product = products.find(product => product.id === id);
   if (!product) {
       const err = new Error(`Product with id ${request.params.id} not found`);
       err.statusCode = 404;
       throw err; // handled by errorResponder
   }
   response.json(product);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL
   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);
   response.json(filteredProducts); // Send the filtered products as a JSON response
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});

module.exports = router;
