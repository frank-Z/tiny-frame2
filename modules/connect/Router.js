'use strict';

const url = require('url');

class Router {

    constructor({route = '/', action}) {
        this.route = route;
        if (action) {
            this.action = action;
        }
    }

    doAction(context, next) {
        let pathname = url.parse(context.request.url).pathname;
        if (pathname !== this.route) {
            return next();
        }
        return this.action(context, next);
    }
}

module.exports = Router;
