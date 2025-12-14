

// 1. Carrega as variáveis de ambiente
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db'); 

const app = express();

app.use(express.json());

// 2. Middleware CORS (se o Frontend estiver em uma porta diferente)

app.use((req, res, next) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// 3. Rota de teste
app.get('/', (req, res) => {
    res.send('API do HelpDesk em execução!');
});

// 4. Conexão com o Banco de Dados 
connectDB(); 


// 5. Definição da porta
const PORT = process.env.PORT || 8080;

// 6. Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});