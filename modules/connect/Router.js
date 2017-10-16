const url = require('url')

class Router {

    constructor({route = '/', action}) {
        this.route = route;
        if (action) {
            this.action = action
        }
    }

    doAction(context, next) {
        let pathname = url.parse(context.request.url).pathname;
        if (pathname !== this.route) {
            return next()
        }
        return this.action(context, next)
    }
}

class PreHandle extends Router {
    constructor() {
        super({})
    }

    action(context, next) {
        console.log('PrepareHandle')
        return next()
    }
}

class PostHandle extends Router {
    constructor() {
        super({})
    }


    doAction(context) {
        context.response.end(' ' + context.body || 'nothing')
    }

}

module.exports = {
    Router,
    preHandle: new PreHandle(),
    PostHandle: new PostHandle(),
}
