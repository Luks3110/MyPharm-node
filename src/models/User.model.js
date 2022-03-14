const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Insira um e-mail'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Insira uma senha']
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;