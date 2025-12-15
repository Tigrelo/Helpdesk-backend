

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Registrar um novo usuário (Cliente padrão)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            // Código de status 400 (Bad Request)
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Criação de um novo usuário (o middleware 'pre-save' em User.js irá hashear a senha)
        const user = await User.create({
            nome,
            email,
            senha,
            perfil: 'Cliente', // Define 'Cliente' como padrão no registro
        });

        if (user) {
            // Código de status 201 (Created)
            res.status(201).json({
                _id: user._id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfil,
                // Geração do token após o registro
                token: generateToken(user._id, user.perfil), 
            });
        } else {
            res.status(400).json({ message: 'Dados de usuário inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
};

// @desc    Autenticar um usuário e obter o token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });

        // Verifica se o usuário existe E se a senha informada corresponde à senha hasheada
        if (user && (await user.matchPassword(senha))) {
            res.json({
                _id: user._id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfil,
                // Geração do token após o login
                token: generateToken(user._id, user.perfil),
            });
        } else {
            // Código de status 401 (Unauthorized)
            res.status(401).json({ message: 'Email ou senha inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
};

module.exports = {
    registerUser,
    authUser,
};