const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');

const serverRender = require('./server-render');

const serverConfig = require('../../build/webpack.config.server');

// 首先在node环境里面编译webpack，   这个compiler可以在node中run、watch等等， 生成在服务端渲染用到的bundle
const serverCompiler = webpack(serverConfig);

// MemoryFS跟fs的却别是， 读取的文件直接存在内存， 不用存储到磁盘中
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;

serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warn => console.warn(err));
    
    // 读取生成的bundle文件
    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'                        // vueserverplugin默认输出的文件名为 vue-ssr-server-bundle.json
    );
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    console.log('new bundle generated');
})


const handleSSR = async (ctx) => {
    if (!bundle) {
        ctx.body = 'wait for a second';
        return;
    }

    const template = fs.readFileSync(
        path.join(__dirname, '../server.template.ejs'),
        'utf-8'
    );

    // 获取客户端webpack devserver打包出来的javascript文件的地址
    // 服务器和客户端都是独立的server，单独的进程
    // 通过服务器向客户端发送请求获取
    const clientManifestResp = await axios.get(
        'http://127.0.0.1:8000/vue-ssr-client-manifest.json'           // vue-ssr-client-manifest.json文件是通过webpack.config.client的配置文件的VueClientPlugin生成
    );

    const clientManifest = clientManifestResp.data;

    const renderer = VueServerRenderer.createBundleRenderer(bundle, {
        inject: false,                                              // 默认VueServerRenderer会指定模板但是限制比较大
        clientManifest
    });
    
    await serverRender(ctx, renderer, template);
}

const router = new Router();

router.get('*', handleSSR);

module.exports = router;