const jwt = require('jsonwebtoken')
const logger = require('../config/logger')

const checkToken = (req, res, next) => {
    const token = req.cookies.jwt;

    // Check if token is not provided
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                logger.error(err)
                return res.status(401).json({error: 'Token inválido'})
            } else{
                logger.info(decodedToken);
                next();
            }
        }) 
    }
    else{
        return res.status(401).json({error: 'Sem token, autorização negada'})
    }
}

module.exports = { checkToken };