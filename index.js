const NodeCache = require("node-cache");
const productCache = new NodeCache();

// Function to get product details
async function getProductDetails(productId) {
  let product = productCache.get(productId);

  if (!product) {
    // Simulate database call
    product = await database.getProductById(productId);
    productCache.set(productId, product, 3600); // Cache for 1 hour
  }

  return product;
}

// Example route in an Express app
app.get('/product/:id', async (req, res) => {
  const product = await getProductDetails(req.params.id);
  res.json(product);
});
