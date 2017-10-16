'use strict';

class PostHandle extends Router {

    doAction(context) {
        context.response.end(' ' + context.body || 'nothing');
    }

}

module.exports = PostHandle;