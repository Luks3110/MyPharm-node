const router = require('express').Router()
const brandController = require('../controllers/Brand.controller')

// List of brands
router.get('/', brandController.getBrands)
// Get brand by ID
router.get('/:id', brandController.getBrandById)
// Add brand
router.post('/', brandController.addBrand)
// Update brand
router.patch('/:id', brandController.updateBrand)
// Delete brand
router.delete('/:id', brandController.deleteBrand)

module.exports = router