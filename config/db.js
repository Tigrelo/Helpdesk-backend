
const mongoose = require('mongoose');

// Função assíncrona para conectar ao DB
const connectDB = async () => {
    try {
        // Obter a URI de conexão do arquivo .env
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`📡 MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Erro ao conectar ao DB: ${error.message}`);
        // Termina o processo em caso de falha
        process.exit(1); 
    }
};

module.exports = connectDB;