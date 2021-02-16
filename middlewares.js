const datas = require('./datas')

const Middlewares = {
    checkIndexInArray(request, response, next) {
        const { id } = request.params

        const exist = datas.findIndex(project => {
            return project.id == id
        })

        if (exist < 0) {
            return response.status(404).json(
                {
                    error: "Project not found"
                }
            )
        }

        request.id = id

        return next()
    }
}

module.exports = Middlewares