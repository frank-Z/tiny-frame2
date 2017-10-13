'use strict';

const http = require('http');
const url = require('url');

class App {
    /**
     * constructor
     */
    constructor() {
        this._q = [];
    }

    /**
     * gather fn
     * @param ro route
     * @param fn function
     */
    use(ro, fn) {
        if (!fn) {
            fn = ro;
            ro = "/"
        }
        /* push routes and fns into queue */
        this._q.push({ro: ro, fn: fn})
    }

    /**
     * handle fns
     * @param ctx  context
     * @param cb callback
     */
    handle(ctx, cb) {
        let self = this;
        let i = 0;

        /* get pathname */
        const _pathname = url.parse(ctx.req.url).pathname;

        /* recursion */
        next();

        function next() {
            let fn = self._q[i];
            if (fn && fn.fn) {
                i++;
                /* check tpl and pathname  */
                if (fn.ro === _pathname.slice(0, fn.ro.length)) { //todo..把这个校验改成类似正则的匹配
                    fn.fn(ctx, next);
                } else {
                    next();
                }
            } else {
                cb();
            }
        }
    }

    /**
     * bind port and trigger handle function
     * @param port
     * @param cb
     */
    listen(port, cb) {
        let self = this;

        /* create server  */
        http.createServer(function (req, res) {
            let ctx = {
                req: req,
                res: res
            };
            self.handle(ctx, () => {
                response(ctx); //临时的一个相应方法
            });
        }).listen(port, function () {
            console.log("listen at " + port + " port");
            if (cb) {
                cb();
            }
        });
    }
}

const response = (ctx) => {
    ctx.res.end("" + ctx.body);
};

module.exports = App;
