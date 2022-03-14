const router = require('express').Router()
const categoryController = require('../controllers/Category.controller')

// List of categories
router.get('/', categoryController.getCategories)
// Get Category By Id
router.get('/:id', categoryController.getCategoryById)
// Add category
router.post('/', categoryController.addCategory)
// Update Category
router.patch('/:id', categoryController.updateCategory)
// Delete Category
router.delete('/:id', categoryController.deleteCategory)
// Add product to category
router.post('/:id/products', categoryController.addProductToCategory)

module.exports = router