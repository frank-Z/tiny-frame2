'use strict';

const Router = require('./router');

class PreHandle extends Router {

    action(ctx, next) {
        ctx.req = ctx.request;
        ctx.res = ctx.response;
        PreHandle.requestHandle(ctx.req);
        PreHandle.responseHandle(ctx.res);
        return next();
    }

    static requestHandle(req) {
        PreHandle.ipMount(req);
        PreHandle.methodReset(req);
        PreHandle.contentTypeMount(req);
    }

    static responseHandle(res) {
        PreHandle.renderMount(res);
        PreHandle.sendMount(res);
    }

    static ipMount(req) {
        let ip = req.headers['x-forwarded-for']
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress;

        ip = ip.split(':').slice(-1).join('');
        req.ip = ip;
    }

    static contentTypeMount(req){

    }

    static methodReset(req) {
        req.method = req.method.toLowerCase();
    }

    static renderMount(res) {
        res.render = "todo.."
    }

    static sendMount(res) {
        res.send = mes => {
            const type = Object.prototype.toString.apply(mes);
            switch (type) {
                case "[object Object]":
                    res.end(JSON.stringify(mes));
                    break;
                case "[object Array]":
                    res.end(JSON.stringify(mes));
                    break;
                case "[object String]":
                    res.end(mes);
                    break;
                case "[object Number]":
                    res.end(mes.toString());
                    break;
                default :
                    res.end(' ');
                    break;
            }
        };
    }

}

module.exports = new PreHandle();