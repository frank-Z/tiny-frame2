'use strict';

const App = require('./modules/connect');
const logger = require('./modules/logger').logger('app');

const app = new App();

app.use(async (ctx, next) => {
    logger.info("中间件1");
    await next();
    logger.info("##中间件1");
});

app.use('/test', async (ctx, next) => {
    logger.info("中间件2");
    await next();
    logger.info("##中间件2");
});

app.use(async (ctx, next) => {
    logger.info("中间件3");
    ctx.body = "44444";
    await next();
});

app.listen(3000).then(() => logger.info('bind 3000'));

