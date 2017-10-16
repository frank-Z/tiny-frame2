'use strict';

class PreHandle extends Router {


    do(context) {
        console.log('PrepareHandle');
        return next();
    }

}

module.exports = PreHandle;