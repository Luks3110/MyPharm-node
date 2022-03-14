const mongoose = require ('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
      type: Number,
      required: true,  
    },
    stock: {
        type: Number,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product;