'use strict';

const Router = require('./router');

class PostHandle extends Router {

    doAction(context) {
        return context.response.end(context.body);
    }

}

module.exports = new PostHandle();