const router = require('express').Router()
const categoryController = require('../controllers/Category/Category.controller')

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

module.exports = router