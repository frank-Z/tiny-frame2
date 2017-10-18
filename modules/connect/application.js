'use strict';

const http = require('http');
const util = require('util');

const Context = require('./context');
const Router = require('./router');
const preHandle = require('./pre-handle');
const postHandle = require('./post-handle');

class Application {

    constructor() {
        this._queue = {
            head: preHandle,
            tail: preHandle,
        };
        this._queue.tail.next = postHandle;
    }

    use(route, action) {
        if (typeof route === 'function') {
            action = route;
            route = '/';
        }
        let rt = new Router(route, action);
        rt.next = this._queue.tail.next;
        this._queue.tail.next = rt;
        this._queue.tail = rt;
        return this;
    }

    handle(request, response) {
        let context = new Context({ request, response });
        let fn = this._compose(this._queue.head);
        fn(context);
    }

    listen(port) {
        let app = http.createServer(this.handle.bind(this));
        return util.promisify(app.listen.bind(app))(port);
    }

    _compose(router) {
        return router.next === null ?
            context => router.doAction(context) :
            context => router.doAction(context, () => this._compose(router.next)(context));
    }
}

module.exports = Application;
