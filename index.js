const { request, response } = require('express')
const express = require('express')
const server = express()

// Settings express
server.use(express.json())

const datas = require('./datas')

// Route (All projects) =>
server.get('/projects', (request, response) => {
    return response.json(datas)
})

// Building the server
server.listen('3333', () => {
    console.log('Server is running ...')
    console.log('Access: http://127.0.0.1:3333')
})