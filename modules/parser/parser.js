/**
 * created by frank-Z
 */

'use strict';

module.exports = {
    json: ({maxSize}) => {
        return async (ctx, next) => {
            if (ckCT(ctx, 'application/json')) return 0;
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
    multer: () => {
        return async (ctx, next) => {
            if (ckCT(ctx, 'multipart/form-data')) return 0;
            await multipartParse(ctx, () => {

            })
        }
    }
};

const qsParse = require('url').parse;

const dataParse = (ctx, {maxSize = '2mb'}) => {
    return new Promise((resolve, reject) => {
        readStream(ctx.req, {maxSize}, (err, buf) => {
            if (err) {
                ctx.body = {};
                resolve(null);
            } else {
                buf = buf.toString();
                try {
                    buf = JSON.parse(buf);
                } catch (e) {
                    //do nothing
                }
                ctx.body = buf;
                resolve('parse ok');
            }
        });
    })
};

const readStream = (stream, {maxSize}, cb) => {
    maxSize = sizeToNum(maxSize);
    let buf = Buffer.from([]);
    let l = 0;
    stream.on('data', function (chuck) {
        l += chuck.length;
        if (l >= maxSize) {
            stream.emit('error', 'too many data...');
        }
        buf = Buffer.concat([buf, chuck]);
    });
    stream.on('end', function () {

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

//check content-type
const ckCT = (ctx, type) => {
    return ctx.req.headers['content-type'].indexOf(type) > -1;
};

const multipartParse = (ctx, {maxSize = '2mb'}) => {
    return new Promise((resolve, reject) => {
        readStream(ctx.req, {maxSize}, (err, buf) => {
            if (err) {
                ctx.body = {};
                resolve(null);
            } else {
                let contentType = ctx.req.headers['content-type'].split(';');
                if (contentType[0] === 'multipart/form-data' && contentType[1].indexOf('boundary=') > -1) {
                    const boundary = contentType[1].split('boundary=')[1];
                    console.log(boundary);
                    //buf = Buffer.from(buf);
                    //buf.slice(52);
                    console.log(buf.slice(boundary.length + 2).indexOf(`--${boundary}`));
                    let a = buf.slice(52, 54);
                    console.log(a);
                    console.log(a.toString());
                    console.log(buf);
                    buf = buf.toString();
                    console.log(buf.slice(52));
                    try {
                        buf = JSON.parse(buf);
                    } catch (e) {
                        //do nothing
                    }
                    ctx.body = buf;
                    resolve('parse ok');
                } else {
                    //do nothing
                    resolve('do nothing');
                }
            }
        });
    })
};

const multipartStreamHandle = (buf, boundary) => {
    let parts = [];
    let l = buf.length, pre = 0, next = 0;
    let delimiter = `--${boundary}`;

    while (buf.slice(pre).indexOf(delimiter) > -1) {
        next = buf.slice(pre + delimiter.length).indexOf(delimiter);
        if (next > 0) {
            parts.push(buf.slice(pre, next))
        }
        pre = next;
    }
    const a = 1;

};