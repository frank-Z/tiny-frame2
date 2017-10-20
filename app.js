'use strict';

const App = require('./modules/connect');
const bodyParse = require('./modules/parser');
const logger = require('./modules/logger').logger('app');

const app = new App();

app.use(bodyParse.json({maxSize: '10mb'}));
app.use(bodyParse.urlencoded());
// app.use(bodyParse.multer());

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
    ctx.body = {a: 1, b: 2};
    await next();
});

app.listen(3000).then(() => logger.info('bind 3000'));

