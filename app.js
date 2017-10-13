"use strict";

const APP = require('./modules/connect');

const app = new APP();

app.use(async (ctx, next) => {
   console.log("中间件1");
    next()
});

app.use(async (ctx, next) => {
    console.log("中间件2");
    next()
});
app.use(async (ctx, next) => {
    console.log("中间件3");
    ctx.body = "44444";
    next()
});

app.listen(3000);



