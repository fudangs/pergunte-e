const sql = require('sequelize');
const conn = require('./database');

const Pergunta = conn.define('perguntas', {
    titulo: {
        type: sql.STRING,
        allowNull: false
    },
    descricao: {
        type: sql.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {
    console.log('Tabela de perguntas criada com sucesso!');
}).catch((err) => {
    console.log('Erro ao criar a tabela de perguntas!');
    console.log('Descrição do erro: '+err);
});
module.exports = Pergunta;