const Koa = require('koa');                              // 只有nodejs的server可以做服务端渲染
const pageRouter = require('./routes/dev-ssr');

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = 500;
        if (isDev) {
            ctx.body = err.message;
        } else {
            ctx.body = 'please try again later';
        }
    }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());                  // koa级联用法

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`);
})