const express = require('express')
const server = express()

// Settings express
server.use(express.json())

// Middlewares
const Middlewares = require('./middlewares')

const datas = require('./datas')

// Middleware Global

function countRequest(request, response, next) {
    console.count("Nº de requisições");

    next()
}

server.use(countRequest)


// Route (All projects) =>
server.get('/projects', (request, response) => {
    return response.json(datas)
})

// Route (Return only project) =>
server.get('/projects/:id', Middlewares.checkIndexInArray, (request, response) => {
    const justProject = datas.find(project => {
        return project.id == request.id
    })

    return response.status(200).json({ justProject })
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
            message: "Project created!"
        }
    )
})

// Route (Update name project) =>
server.put('/projects/update/:id', Middlewares.checkIndexInArray, (request, response) => {
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

// Route (Delete project) =>
server.delete('/projects/remove/:id', Middlewares.checkIndexInArray, (request, response) => {
    const { id } = request.params

    const indexProject = datas.findIndex(project => {
        return project.id == id
    })

    datas.splice(indexProject, 1)

    return response.json(
        {
            message: "Project removed successfull"
        }
    )
})

// Building the server
server.listen('3333', () => {
    console.log('Server is running ...')
    console.log('Access: http://127.0.0.1:3333')
})