const User = require('../../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register
module.exports.register = async (req, res) => {
    const {
        name,
        email,
        password,
        confirmPassword
    } = req.body
    // Validations
    if (password !== confirmPassword) {
        return res.status(422).json({
            error: 'Senhas não correspondem'
        })
    }
    if (!name || !email || !password || !confirmPassword) {
        return res.status(422).json({
            error: 'Preencha todos os campos'
        })
    }
    // Check if email already exists
    const userExist = await User.findOne({
            email: email
        })
        .catch(err => res.status(500).json({
            error: 'Erro ao procurar usuário'
        }))

    if (userExist) {
        return res.status(422).json({
            error: 'Usuário já existe'
        })
    }
    try {
        // Create password hash with 12 chars
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        // Send res with sucess message
        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            Dados: { user }
        })
        // Handle error
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Algo deu errado'
        })
    }
}
// Login
module.exports.login = async (req, res) => {
    const {
        email,
        password
    } = req.body
    const userExist = await User.findOne({
        email: email
    })
    const checkPassword = await bcrypt.compare(password, userExist.password)

    // Validations
    // Check fields
    if (!email || !password) {
        return res.status(422).json({
            error: 'Preencha todos os campos'
        })
    }
    // Search by email
    if (!userExist) {
        return res.status(422).json({
            error: 'Usuário inexistente'
        })
    }
    // Check if passwords match
    if (!checkPassword) {
        return res.status(422).json({
            error: 'Senha incorreta'
        })
    }

    try {
        const secret = process.env.SECRET
        // Create token
        const token = jwt.sign({ _id: userExist._id }, secret)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 300000})
        
        res.status(200).json({
            msg: 'Login realizado com sucesso',
            token: {
                token
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(422).json({
            error: 'Algo deu errado'
        })
    }
}

// Logout
module.exports.logout = async (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({message: 'logout'})
}