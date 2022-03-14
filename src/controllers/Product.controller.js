const Product = require('../models/Product.model')
const Category = require('../models/Category.model')
const Brand = require('../models/Brand.model')
// List of products
module.exports.getProducts = async (req, res) => {
    await Product.find().populate("brand").populate("categories")
    .then((response) => {
        res.status(200).json({
            message: 'Lista de produtos',
            produtos: { response }
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: 'Algo deu errado'})
    })    
}

// Get products by Id
module.exports.getProductById = async (req, res) => {
    await Product.findById(req.params.id).populate("brand").populate("categories")
    .then((response) => {
        res.status(200).json({
            message: 'Produto encontrado',
            Produto: { response }
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
        .then((response) => res.status(200).json({message: 'Produto atualizado com sucesso!', Produto: { response }}))
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

module.exports.addCategoryToProduct = async (req, res) => {
    const { id } = req.params
    const { categoryID } = req.body
    const product = await Product.findById(id)
    .catch((err) => {
        console.log(err)
        return res.status(404).json({
            message: 'Produto não encontrado'
        })
    })
    
    await Category.findById(categoryID)
    .then((response) => {
        if(product.categories.includes(response._id)){
            return res.status(422).json({
                message: 'Categoria já existe no produto'
            })
        }
        product.categories.push(response._id)
        product.save()
        return res.status(200).json({ message: 'Categoria adicionada com sucesso!', produto: product})
    })
    .catch((err) => {
        console.log(err)
        return res.status(404).json({
            message: 'Categoria não encontrada'
        })
    })
}

module.exports.addBrandToProduct = async (req, res) => {
    const { id } = req.params
    const { brandID } = req.body

    const product = await Product.findById(id)
    .catch((err) => {
        console.log(err)
        return res.status(404).json({
            message: 'Produto não encontrado'
        })
    })
    
    await Brand.findById(brandID)
    .then((response) => {
        if(product.brand.includes(response._id)){
            return res.status(422).json({
                message: 'Marca já existe no produto'
            })
        }
        product.brand.push(response._id)
        product.save()
           return res.status(200).json({ message: 'Marca adicionada com sucesso!', produto: product})
       })
       .catch((err) => {
           console.log(err)
            return res.status(404).json({
            message: 'Marca não encontrada'
        })
    })    
}