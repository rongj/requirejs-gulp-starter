# 前端多页面开发脚手架

### 项目结构
```
|——— src
|     |—— mnl
|          |——— css                           // 开发环境下编译生成的css目录（可无）
|          |     |—— *.css                    // 开发环境下编译生成的css文件，方便src下html直接引用，无版本号
|          |
|          |——— fonts                         // 字体目录（暂无）
|          |——— images                        // 图片文件夹
|          |——— js
|          |     |—— lib                      // 第三方js文件
|          |     |    |—— *.js
|          |     |
|          |     |—— plugins                  // 第三方插件目录
|          |     |
|          |     |—— common                   // 公用js方法或者组件js
|          |     |    |—— *.js
|          |     |
|          |     |—— page                     // 单个页面对应的入口js
|          |          |—— *.js
|          |
|          |——— mocks                         // 模拟数据文件
|          |——— rev                           // 生产环境生成的版本信息文件夹
|          |     |—— js
|          |     |    |—— common
|          |     |    |—— page
|          |     |—— css
|          |——— scss
|          |     |—— reset.scss                // 重置样式文件
|          |     |—— _common.scss             // 公共样式文件(带下划线的不会编译生成对应的css文件)
|          |     |—— *.scss                   // 可编译生成css文件
|          |
|          |——— *.html                        // 单个页面html
|          |
|        
|——— package.json                        // 项目所需依赖npm模块
|——— gulpfile.js                         // gulp配置文件
|——— .gitignore                          // git上传忽略文件
|——— README.md                           // 项目说明
|
|
|——— dist                                // 打包后的文件夹
|     |——— css                           // 打包生成的css目录
|     |
|     |——— images                        // 图片文件夹
|     |
|     |——— js                            // 打包生成的js目录 与src下一致(默认common目录下js带有?v=hash形式的版本号, 可以自由定制)
|     |
|     |——— *.html                        // 单个页面html，已压缩，已替换css,js(可自由配置绝对路径)
|     |
```
### 项目运行

##### 安装依赖
npm install

##### 开发环境
```
修改guklpfile.js 下__path执行不同目录下的编译
```
gulp dev 
```
开发环境下不会生成dist目录，不会产生js,css等版本文件，只是执行scss文件编译
```
##### 生产环境
gulp build
```
生成dist目录，添加css,js版本号，自动替换html对应的css,js
```