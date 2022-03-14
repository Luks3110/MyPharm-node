const Category = require('../models/Category.model')

// List of categories
module.exports.getCategories = async (req, res) => {
    const categories = await Category.find()
    .then(res => {
        return res.status(200).json({
            message: 'Lista de categorias',
            categories: { categories }
        })
    })
    .catch((err) => {
        console.error(err)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    })
}

// Category By Id
module.exports.getCategoryById = async (req, res) => {
    const { id } = req.params
    const category = await Category.findById(id)
    .then(res => {
        return res.status(200).json({
            message: 'Categoria encontrada',
            categoria: { category }
        })
    })
    .catch((err) => {
        console.error(err)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    })
}

// Add new category
module.exports.addCategory = async (req,res) => {
    const { name, description } = req.body
    // Validations
    const categoryExist = await Category.findOne({
        name: name
    })
    if(categoryExist){
        return res.status(422).json({
            message: 'Categoria já existe'
        })
    }
    const category = await Category.create({
        name,
        description
    })
    .then(res => {
        res.status(201).json({
            message: 'Categoria criada com sucesso!',
            categoria: { category }
        })
    })
    .catch(err => {
        console.error(err)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    })
}

module.exports.updateCategory = async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body
    const category = await Category.findByIdAndUpdate(id)
    .then(() => res.status(200).json({
        message: 'Categoria atualizada com sucesso!',
        category: { category }
    }))
    .catch((err) => res.status(404).json({
        message: 'Categoria não encontrada'
    }))
}

module.exports.deleteCategory = async (req,res) => {
    const { id } = req.params
    const category = await Category.findByIdAndDelete(id)
    .then(() => res.status(200).json({message: 'Categoria deletada com sucesso!'}))
    .catch((err) => res.status(404).json({message: 'Categoria não encontrada'}))
}


module.exports.addProductToCategory = async (categoryId, product) => {
    const { id } = categoryId
    return Category.findByIdAndUpdate(
        id,
        { $push: { products: product._id} },
        { new: true, useFindAndModify: false }
    )
}