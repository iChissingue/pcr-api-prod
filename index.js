const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Router = require('./Router/Router')


app.use(cors({origin: '*'},
    exposedHeaders: ['Authorization']
))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', Router)
app.use('/', (req, res)=> res.status(200).send("Pagina nao encontrada!"))

const PORT = process.env.PORT || 2026

app.listen(PORT, ()=> console.log(`A aplicacao esta rodado na porta ${PORT}`))