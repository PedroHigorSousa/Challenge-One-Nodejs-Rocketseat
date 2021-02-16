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

// Route (Return only project) =>
server.get('/projects/:id', (request, response) => {
    const { id } = request.params

    const justProject = datas.find(project => {
        return project.id == id
    })

    return response.json(
        {
            justProject
        }
    )

})

// Route (Create the new project) =>
server.post('/projects/new', (request, response) => {
    const { id, title, task } = request.body

    datas.push(
        {
            "id": id,
            "title": title,
            "tasks": [task]
        }
    )

    return response.json(
        {
            "message": "Project created!"
        }
    )
})

// Route (Update name project) =>
server.put('/projects/update/:id', (request, response) => {
    const { id } = request.params
    const { title } = request.body

    const indexProject = datas.findIndex(project => {
        return project.id == id
    })

    datas[indexProject].title = title

    return response.json(
        {
            message: datas[indexProject]
        }
    )

})

// Building the server
server.listen('3333', () => {
    console.log('Server is running ...')
    console.log('Access: http://127.0.0.1:3333')
})