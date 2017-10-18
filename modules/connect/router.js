'use strict';

const url = require('url');

class Router {

    constructor(route, action) {
        this.route = route || '/';
        this.next = null;
        if (action) {
            this.action = action;
        }
    }

    doAction(context, next) {
        let pathname = url.parse(context.request.url).pathname;
        if (!new RegExp(this.route).exec(pathname)) {
            return next();
        }
        return this.action(context, next);
    }

    action(context, next) {
        if (next) {
            return next()
        }
    }
}

module.exports = Router;
