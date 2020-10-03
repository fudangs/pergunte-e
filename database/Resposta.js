const sql = require('sequelize');
const conn = require('./database');
const Resposta = conn.define('respostas', {
    resposta: {
        type: sql.TEXT,
        allowNull: false
    },
    pergunta:{
        type: sql.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force:false}).then(() => {
    console.log('Tabela de respostas criada com sucesso!');
}).catch((err) => {
    console.log('Erro ao criar tabela de respostas!');
    console.log('Descrição do erro: '+err);
})

module.exports = Resposta;