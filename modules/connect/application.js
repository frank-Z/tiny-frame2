'use strict';

const http = require('http');
const util = require('util');

const Context = require('./context');
const Router= require('./Router');

class Application {

    constructor() {
        this.__queue = [];
    }

    use(route = '/', action = route) {
        if(typeof route === 'function') {
            route = '/'
        }
        this.__queue.push(new Router({ route, action }));
        return this;
    }

    handle(request, response) {
        let context = new Context({ request, response });
        this.__compose(this.__queue)(context);
    }

    listen(port) {
        let app = http.createServer(this.handle.bind(this));
        return util.promisify(app.listen.bind(app))(port);
    }

    __compose(queue) {
        if (queue.length === 1) {
            return context => queue[0].doAction(context,()=> {});
        }
        return context => queue[0].doAction(context,()=> this.__compose(queue.slice(1))(context));
    }
}

module.exports = Application;
