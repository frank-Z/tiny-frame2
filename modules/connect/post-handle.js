'use strict';

const Router = require('./router');

class PostHandle extends Router {

    doAction(ctx) {
        ctx.res.send(ctx.body || '');
    }

}

module.exports = new PostHandle();