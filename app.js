'use strict';

const Application = require('./modules/connect/application');
const { log } = require('./util/logger')

const app = new Application();

app.use(async (ctx, next) => {
    log.info("中间件1");
    await next();
    log.info("##中间件1");
});

app.use('/test', async (ctx, next) => {
    log.info("中间件2");
    await next();
    log.info("##中间件2");
});

app.use(async (ctx, next) => {
    log.info("中间件3");
    ctx.body = "44444";
    await next();
});

app.listen(3000).then(() => log.info('bind 3000'));

