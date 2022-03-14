const Brand = require('../models/Brand.model')
const Product = require('../models/Product.model')
// List of Brands
module.exports.getBrands = async (req, res) => {
    await Brand.find()
    .then((brands) => res.status(200).json({ brands }))
    .catch((err) => {
        console.log(err)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    })
}

module.exports.getBrandById = async (req, res) => {
    await Brand.findById(req.params.id)
    .then((brand) => res.status(200).json({ brand }))
    .catch((err) => {
        console.log(err)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    })
}

// Add brand
module.exports.addBrand = async (req, res) => {
    const { name } = req.body
    // Validations
    const brandExist = await Brand.findOne({ name: name })
    if(brandExist) {
        return res.status(422).json({
            message: 'Marca já existe'
        })
    }
    await Brand.create({ name })
    .then((response) => res.status(200).json({
        message: 'Marca criada com sucesso!',
        brand: response
    }))
    .catch((err) => {
        console.log(err)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    })
}

// Update Brand
module.exports.updateBrand = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const brand = await Brand.findById(id)
    if(!brand) {
        return res.status(404).json({
            message: 'Marca não encontrada'
        })
    }
        const updatedBrand = await Brand.findByIdAndUpdate(id, {
            name: name
        })
        .then(() => res.status(200).json({message: 'Marca atualizada com sucesso!', Marca: { updatedBrand }}))
        .catch((err) => {
            console.log(err)
            return res.status(500).json({
                message: 'Algo deu errado'
            })
        })
}

// Delete Brand
module.exports.deleteBrand = async (req, res) => {
    const { id } = req.params
    const brand = await Brand.findById(id)
    if(!brand) {
        return res.status(404).json({
            message: 'Marca não encontrada'
        })
    }
    await Brand.findByIdAndDelete(id)
    .then(() => res.status(200).json({message: 'Marca deletada com sucesso!'}))
    .catch((err) => {
        console.log(err)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    })
}