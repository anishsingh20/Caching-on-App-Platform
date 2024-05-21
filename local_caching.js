// index.js
const express = require('express');
const NodeCache = require('node-cache');
const { getProductById } = require('./database');

const app = express();
const productCache = new NodeCache();

// Function to get product details with local caching
async function getProductDetailsLocalCache(productId) {
  let product = productCache.get(productId);

  if (!product) {
    console.log('Cache miss - fetching from database');
    product = await getProductById(productId);
    productCache.set(productId, product, 3600); // Cache for 1 hour
  } else {
    console.log('Cache hit');
  }

  return product;
}

app.get('/product/local/:id', async (req, res) => {
  const product = await getProductDetailsLocalCache(req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
