const express = require('express')
const app = express()
const cors = require('cors')
const port = 8080

const mongoose = require('mongoose')

const Animal = mongoose.model('Animal', new mongoose.Schema({
    tipo: String,
    nombre: String,
}))

mongoose.connect('mongodb://appmundial:generation2022@cluster0.1ec3zlg.mongodb.net/test')

app.get('/', async (req, res) => {
    console.log('get /')
    const animales = await Animal.find()
    return res.send(animales)
})

app.get('/crear', async (req, res) => {
    console.log('create')
    await Animal.create({tipo: 'gato', nombre: 'Mijael'})
    return res.send('ok')
})
// app.use(cors())
// app.use(express.json())
// RUTAS
// app.use(require('./src/routes'))


app.listen(port, () => console.log('Server on in', port))