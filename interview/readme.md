## Vue项目搭建

## 开发运行
```bash
    # 拉取对应分支代码
    # 安装依赖
    npm install
    # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org
    # 本地开发 开启服务
    npm run dev
    # 浏览器访问 http://localhost:9317
    # 环境变量配置为config目录下的index.js文件， 包括配置assetsPublicPath、接口代理配置proxyTable、构建后的代码sourceMap配置、开启GZIP配置等等
    # 构建静态文件(跟目录下会生成dist目录存放静态文件)
    npm run build
```

```bash
# webpack项目优化
查看依赖包大小： webpack --display-modules --sort-modules-by size 定位到排名前几的js文件或者第三方依赖
将打包的所有依赖文件以及关系，以json格式进行输出：webpack --profile --json > stats.json
方案：
    CommonsChunkPlugin提取公共代码
    dll-plugin进行大文件单独打包，缓存
    删除无用的依赖
    选择性的弃用一些依赖
    代码压缩
    babel-polyfill
    Scope Hoisting


    externals 避免打包大的第三方依赖
    dll-plugin 预打包第三方依赖
    happypack 多进程处理，缓存
    缓存与增量构建： babel-loader?cacheDirectory  webpack cache:true
    减少构建搜索或编译路径 alias resolve
    具象打包的范围 include exclude
```

```bash
# extract-text-webpack-plugin给webpack打包时出现报错: DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead

# 解决： 使用extract-text-webpack-plugin的最新的beta版  --> npm install extract-text-webpack-plugin@next

# 备注： webpack4 不适应extract-text-webpack-pluginu抽取css到单独的文件 选用npm install --save-dev mini-css-extract-plugin替代


```

```bash
# webpack4 升级指南
1、webpack版本不一致： 更新包： webpack、webpack-dev-server、webpack-merge、webpack-cli（webpack命令行启动包）
2、更新之后各种loader包都会在命令行提示跟新， 需要先卸载在重新装新的依赖包
3、extract-text-webpack-plugin正式版没有更新， 需要安装beta版本
4

```
