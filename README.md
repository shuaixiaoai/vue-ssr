## vue-ssr
进入项目目录，运行
```
npm install
```
然后执行
```
npm run dev
```
开始开发项目

### webpack-merge
`npm install webpack-merge -D` 安装使用webpack-merge, 合并不同的配置， 会根据webpack配置里面的每一项分布， 合理的合并config


### vue-loader配置
1、设置清楚行尾多可空格， 设置vue-loader的preserveWhitepace为true               
2、使用`new ExtractPlugin('styles.[contentHash:8].css')`打包css文件到单独的文件， 但是vue组件内的css没用提取出来， 因为vue会单独的处理内部style的样式为内联样式， 即， 默认情况下ExtractPlugin不会把.vue文件的css提取出来。如果希望提取出来， 需要单独设置vue-loaderde的extractCss为true。 vue之所以这么做， 是认为这种不提取css的方式更合理。 比如， 当异步加载模块的时候， 如果单独提取， 就会在不加载模块的时候，就已经加载css， 增加首屏的代码量。              
3、css没有热重载。 出来方案： 不适用style-loader, 使用vue-style-loader代替

#### git 第一次关联项目提交代码
```bash
1. git add .
2. git commit
3. git push --set-upstream origin <分支>
4. git push -u origin master                                               # 把本地库的所有内容推送到远程库上
5. git branch -r -d origin/branch-name                                     # 删除远程分支
6. find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch    # 查找当前目录以及其子目录下的.DS_Store， 并且删除
```
