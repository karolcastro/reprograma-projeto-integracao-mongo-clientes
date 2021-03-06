
// dependencias do projeto
const express = require("express")// constroi o servidor
const mongoose = require("mongoose")// faz o require do mongoose que é para aconexao do mongo
const bodyParser = require("body-parser")// converte p body para um json
const app = express()

//mongoose.connect('mongodb://admin:reprograma1@ds225902.mlab.com:25902/reprogramameli', { useNewUrlParser: true }) // para chamar a conexao com o banco de dados mongo
//mongodb://localhost:27017/clientes
mongoose.connect('mongodb://localhost:27017/clientes', { useNewUrlParser: true }) // para chamar a conexao com o banco de dados mongo

//mongoose.connect('mongodb+srv://adimin:admin123@cluster0-qfwf2.mongodb.net/clientes', { useNewUrlParser: true });// para chamar a conexao com o banco de dados mongo

//chama o mongo
let db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'))// tenta fazer a conexao e fica de olho caso haja algo errado
db.once('open', function () { // faz a conexao e se nao mostra o erro
  console.log('conexão feita com sucesso com o Mongo.')// se der certo aparece esta mensagem
})

//rotas
const clientes = require("./routes/clientesRoute")
const sessions = require("./routes/sessionRoute")

// app.use(express.json()); //talvez faca a mesma coisa que o bodyParse

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")//controlar os acessos de origens(nesse caso qualquer um)
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"//o que é permitido de retorno
  )
  next()
})
app.use(express.static('public'))//  apidoc
app.use(bodyParser.json());// indicar que vai ser utilizado para coverter o body no json
app.use("/clientes", clientes)//áqui é definido o que sera chamado na rota do postman, todos comecaram com clientes/ alguma coisa
app.use("/sessions", sessions)

module.exports = app