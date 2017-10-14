const url = require('url')

class Middleware {

    constructor({ route = '/', action }) {
        this.route = route
        if (action) {
            this.action = action
        }
        this.next = null
    }

    doAction(context, next) {
        let pathname = url.parse(context.request.url).pathname
        console.log(pathname)
        if (pathname !== this.route) {
            return next()
        }
        return this.action(context, next)
    }
}

class PreHandle extends Middleware {
    constructor() {
        super({})
    }

    action(context, next) {
        console.log('PrepareHandle')
        return next()
    }
}

class PostHandle extends Middleware {
    constructor() {
        super({})
    }


    doAction(context) {
        context.response.end('404')
    }

}

module.exports = {
    Middleware,
    preHandle: new PreHandle(),
    PostHandle: new PostHandle(),
}
