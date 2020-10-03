const express = require('express');
const app = express();
const bp = require('body-parser');
const conn = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
conn.authenticate().then(() => {
    console.log('Conexão realizada com o banco de dados');
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados.');
    console.log('Descrição do erro: '+err);
})

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(bp.urlencoded({extended: false}));
app.use(bp.json())

app.get("/perguntar", (req,res) => {
    res.render('perguntar');
});
app.get("/", (req,res) => {
    Pergunta.findAll({
        raw: true, 
        order:[
            ['id','DESC']
        ]
    }).then(perguntas => {
        res.render('index',{
            perguntas: perguntas
        });
    });
});
app.post("/criarPergunta", (req,res) => {
    var titulo = req.body.iTituloPergunta;
    var desc = req.body.txtDesc;
    Pergunta.create({
        titulo: titulo,
        descricao: desc
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/pergunta/:id', (req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({
                raw:true,
                where: {pergunta: id},
                order: [['id', 'DESC']]
            }).then((respostas) => {
                res.render('responder',{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        }else{
            res.render('404')
        }
    })
});

app.post('/responder', (req,res) => {
    var resp = req.body.txtResposta;
    var perg = req.body.iPergunta;
    console.log(resp);
    console.log(perg);
    Resposta.create({
        resposta: resp,
        pergunta: perg
    }).then(() => {
        res.redirect('/');
    })
})
app.listen(8080, ()=> {
    console.log("Aplicação de perguntas e respostas inicializada!");
});