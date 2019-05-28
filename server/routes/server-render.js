const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
    ctx.headers['Content-Type'] = 'text/html'

    const context = { url: ctx.path }                       // 包含各种各样的文件

    try {
        const appString = await renderer.renderToString(context)
        const html = ejs.render(template, {
            appString,
            styles: context.renderStyles(),
            scripts: context.renderScripts(),
        })

        ctx.body = html
        console.log(ctx.body)
    } catch (err) {
        throw err
    }
}