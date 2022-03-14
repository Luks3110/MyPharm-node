const Product = require('../models/Product.model')

// List of products
module.exports.getProducts = async (req, res) => {
    const products = await Product.find()
    .then(() => {
        res.status(200).json({
            message: 'Lista de produtos',
            Produtos: products
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: 'Algo deu errado'})
    })    
}

// Get products by Id
module.exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    .then(() => {
        res.status(200).json({
            message: 'Produto encontrado',
            Produto: product
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: 'Algo deu errado'})
    })
}

// Add new product
module.exports.addProduct = async (req, res) => {
    const{
        name,
        description,
        price,
        stock,
        categories,
        brand
    } = req.body
    // Validations
    const productExist = await Product.findOne({
        name: name,
        brand: brand
    })
    if(productExist) {
        return res.status(422).json({
            message: 'Produto já existe'
        })
    }
    try{
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            categories,
            brand
        })
        res.status(201).json({
            message: 'Produto criado com sucesso!',
            Dados: { product }
        })
    }
    catch(error) {
        console.error(error)
        return res.status(500).json({
            message: 'Algo deu errado'
        })
    }
}

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params
    const { 
        name,
        description,
        price,
        stock,
        categories,
        brand
    } = req.body
    const product = await Product.findById(id)
    if(!product) {
        return res.status(404).json({
            message: 'Produto não encontrado'
        })
    }
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name: name,
            description: description,
            price: price,
            stock: stock,
            categories: categories,
            brand: brand
        })
        .then(() => res.status(200).json({message: 'Produto atualizado com sucesso!', Produto: { updatedProduct }}))
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: 'Algo deu errado'})
        })
    }

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params

    const product = await Product.findById(id)
    if(!product){
        return res.status(404).json({
            message: 'Produto não encontrado'
        })
    }
    Product.findByIdAndDelete(id)
    .then(() => res.status(200).json({message: 'Produto deletado com sucesso!'}))
    .catch(error => res.status(500).json({message: 'Algo deu errado'}))
}

module.exports.addCategoryToProduct = async (productId, category) => {
    const { id } = productId
    return Product.findByIdAndUpdate(
        id, 
        { $push: { categories: category._id} },
        { new: true, useFindAndModify: false }
    )
}

module.exports.addBrandToProduct = async (productId, brand) => {
    const { id } = productId
    return Product.findByIdAndUpdate(
        id, 
        { $push: { brand: brand._id} },
        { new: true, useFindAndModify: false }
    )
}