'use strict';

const Router = require('./router');

class PreHandle extends Router {

    action(context, next) {
        return next();
    }
}

module.exports = new PreHandle();