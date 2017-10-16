"use strict";

const APP = require('./modules/connect/application');

const app = new APP();

app.use(async (ctx, next) => {
    console.log("中间件1");
    await next()
    console.log("##中间件1");
});

app.use('/test',async (ctx, next) => {
    console.log("中间件2");
    await next();
    console.log("##中间件2");
});
app.use(async (ctx, next) => {
    console.log("中间件3");
    ctx.body = "44444";
    await next()
});

app.listen(3000);



