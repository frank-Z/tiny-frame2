/**
 * created by frank-Z
 */

'use strict';

module.exports = {
    json: ({maxSize}) => {
        return async (ctx, next) => {
            await dataParse(ctx, {maxSize});
            await next();
        }
    },
    urlencoded: () => {
        return async (ctx, next) => {
            ctx.query = qsParse(ctx.req.url, true).query;
            await next();
        }
    },
    // multer: () => {
    //     return async (ctx, next) => {
    //         multipartParse(ctx.req, () => {
    //
    //         })
    //     }
    // }
};

const qsParse = require('url').parse;

const dataParse = (ctx, {maxSize = '2mb'}) => {
    return new Promise((resolve, reject) => {
        rawParse(ctx.req, {maxSize}, (err, res) => {
            if (err) {
                ctx.body = {};
                resolve(null);
            } else {
                ctx.body = res;
                resolve('parse ok');
            }
        });
    })
};

const rawParse = (stream, {maxSize}, cb) => {
    maxSize = sizeToNum(maxSize);
    let buf = [];
    let l = 0;
    stream.on('data', function (chuck) {
        l += chuck.length;
        if (l >= maxSize) {
            stream.emit('error', 'too many data...');
        }
        buf = buf.concat(chuck);
    });
    stream.on('end', function () {
        buf = buf.toString();
        try {
            buf = JSON.parse(buf);
        } catch (e) {
            //do nothing
        }
        cb(null, buf);
    });
    stream.on('error', function (errMsg) {
        cb(errMsg);
    })
};

const sizeToNum = str => {
    if (typeof str === 'number') return str;

    const tpl = /^(\d+(?:\.\d+)?) *(kb|mb|gb|tb)$/;
    const arr = str.match(tpl);
    if (arr) {
        const map = {
            kb: 1 << 10,
            mb: 1 << 20,
            gb: 1 << 30,
            tb: ((1 << 30) * 1024)
        };
        return map[arr[2]] * arr[1];
    }
    return null;
};

const multipartParse = (stream, cb) => {
    let buf = [];
    stream.on("data",function (chuck) {
        console.log(chuck)
        buf = buf.concat(chuck);
    });
    stream.on("end",function (...arg) {
        var a =buf.toString();
        console.log(a);
    })
};