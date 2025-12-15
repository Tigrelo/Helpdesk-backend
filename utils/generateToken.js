const jwt = require('jsonwebtoken');

const generateToken = (id, perfil) => {
    return jwt.sign(
        { id, perfil }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: '10d', 
        }
    );
};

module.exports = generateToken;