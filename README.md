# 基于require开发gulp打包的demo

### 项目结构
```
├─gulpfile.js  // gulp配置文件
├─package.json
├─README.md
├─src   // 开发目录
|  ├─detail.html
|  ├─index.html   //  html文件
|  ├─scss
|  |  ├─page   // 引用的css文件会生成对应的css
|  |  |  ├─detail.scss
|  |  |  ├─index.scss
|  |  |  ├─login.scss
|  |  |  ├─popup.scss
|  |  |  └reset.scss
|  |  ├─common  // 公用scss文件以_开头
|  |  |   ├─_common.scss
|  |  |   ├─_footer.scss
|  |  |   ├─_header.scss
|  |  |   └_sprite.scss
|  ├─rev   // js、css版本
|  |  ├─js
|  |  | └rev-manifest.json
|  |  ├─css
|  |  |  └rev-manifest.json
|  ├─js
|  | ├─utils   // js工具
|  | |   ├─global.js
|  | |
|  | ├─page    // 页面引用的js入口
|  | |  ├─index.js
|  | |  ├─detail.js
|  | |  
|  | ├─lib     // js库
|  | |  ├─jquery.js
|  | |
|  | ├─common  // 公用js
|  | |   ├─a.js
|  | |   
|  ├─images
|  |   ├─bg4.png
|  |   ├─close_03.png
|  |   ├─close_pop.png
|  |   ├─icons.png
|  |   ├─icons  // 打包生成雪碧图的目录
|  |   |   ├─arrow-left.png
|  |   |
|  |   ├─hd19   // 打包复制目录
|  |   |  ├─19.png
|  |   |  └19banner.jpg
|  ├─css   //  开发环境生成的css
|  |  ├─detail.css
|  |  ├─index.css
|  |  ├─login.css
|  |  ├─popup.css
|  |  └reset.css
|  |
|  |
|  |
├─dist  //  生产目录
|  ├─detail.html
|  ├─index.html
|  ├─js
|  | ├─detail.js
|  | ├─index.js
|  | └require.js
|  ├─images
|  |   ├─bg4.png
|  |   ├─close_03.png
|  |   ├─close_pop.png
|  |   ├─icons.png
|  |   ├─hd19
|  |   |  ├─19.png
|  |   |  └19banner.jpg
|  ├─css
|  |  ├─detail.css
|  |  ├─index.css
|  |  ├─login.css
|  |  ├─popup.css
|  |  └reset.css
```

### 实现功能
[x] 雪碧图合成
[x] 一个页面一个js
[x] 兼容ie8+
[x] 修改版本号?v=
[x] 分项目打包

### 项目运行
##### 安装依赖
```bash
npm install
```

##### 开发环境
```bash
gulp dev
直接打开src目录下html即可运行
开发环境下不会生成dist目录，不会产生js,css等版本文件，只是执行scss文件编译
```

##### 生产环境
```bash
gulp build
生成dist目录，代码压缩合并添加版本号，去掉冗余的目录
```
