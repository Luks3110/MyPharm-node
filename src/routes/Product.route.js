const router = require('express').Router();
const productController = require('../controllers/Product/Product.controller');

// List of categories
router.get('/', productController.getProducts);
// Get product by ID
router.get('/:id', productController.getProductById);
// Add product
router.post('/', productController.addProduct);
// Update product
router.patch('/:id', productController.updateProduct);
// Delete product
router.delete('/:id', productController.deleteProduct);
// Add category to product
router.post('/:id/categories', productController.addCategoryToProduct);
// Add brand to product
router.post('/:id/brands', productController.addBrandToProduct);

module.exports = router;