const Category = require('../../models/Category.model')
const logger = require('../../config/logger')
// List of categories
module.exports.getCategories = async (req, res) => {
     await Category.find()
    .then(response => {
        return res.status(200).json({
            message: 'Lista de categorias',
            categories: { response }
        })
    })
    .catch((err) => {
        logger.error(err)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    })
}

// Category By Id
module.exports.getCategoryById = async (req, res) => {
    const { id } = req.params
    await Category.findById(id)
    .then(response => {
        return res.status(200).json({
            message: 'Categoria encontrada',
            categoria: { response }
        })
    })
    .catch((err) => {
        logger.error(err)
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
    await Category.create({
        name,
        description
    })
    .then(response => {
            res.status(201).json({
            message: 'Categoria criada com sucesso!',
            categoria:  response 
        })
    })
    .catch(err => {
        logger.error(err)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    })
}

module.exports.updateCategory = async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body
    await Category.findByIdAndUpdate(id, { name: name, description: description })
    .then((response) => res.status(200).json({
        message: 'Categoria atualizada com sucesso!',
        categoria: response
    }))
    .catch((err) => {
        logger.error(err)
        res.status(404).json({
        message: 'Categoria não encontrada'
        })
    })
}

module.exports.deleteCategory = async (req,res) => {
    const { id } = req.params
    await Category.findByIdAndDelete(id)
    .then(() => res.status(200).json({message: 'Categoria deletada com sucesso!'}))
    .catch((err) => res.status(404).json({message: 'Categoria não encontrada'}))
}