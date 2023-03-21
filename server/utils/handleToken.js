const jwt = require('jsonwebtoken');

const hasValidToken = (req, res, next) => {
    const token = req.session.token
    if(!token) return res.status(400).send('Vous n\'êtes pas autorisé à accéder à cette ressource')
    const pincode = jwt.verify(token, "SecretJWT").pincode
    if(!pincode) return res.status(400).send('Vous n\'êtes pas autorisé à accéder à cette ressource')
    next()
}

module.exports = hasValidToken