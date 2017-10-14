const Application = require('../modules/connect/application')


const app = new Application()

app.use((context, next) => {
    context.response.end('test-app')
    next()
})

app.listen(3000)