

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    senha: {
        type: String,
        required: true,
    },
    perfil: {
        type: String,
        required: true,
        // Define os valores permitidos (Enum)
        enum: ['Admin', 'Tecnico', 'Cliente'], 
        default: 'Cliente',
    },
    dataCriacao: {
        type: Date,
        default: Date.now,
    },
});


// Middleware Pre-save: Criptografar a senha antes de salvar

UserSchema.pre('save', async function (next) {
    // Só executa se a senha foi modificada 
    if (!this.isModified('senha')) {
        next();
    }

    // Gerar um salt 
    const salt = await bcrypt.genSalt(10); 
    // Fazer o hash da senha
    this.senha = await bcrypt.hash(this.senha, salt); 
});



// Método de Comparação de Senha (Para o login)

UserSchema.methods.matchPassword = async function (enteredPassword) {
    // Compara a senha informada com a senha hasheada no DB
    return await bcrypt.compare(enteredPassword, this.senha);
};


const User = mongoose.model('User', UserSchema);

module.exports = User;