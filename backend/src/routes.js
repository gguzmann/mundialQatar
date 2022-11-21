const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    fetch('https://world-cup-json-2022.fly.dev/teams')
    .then(response => response.json())
    .catch(err => err)
    .then(resp => {
        console.log(resp)
        res.json(resp)
    })

})

router.get('/test', (req, res) => {
    res.send('hola')
})

router.get('/contact', (req, res) => {
    res.send('hola')
})


module.exports = router