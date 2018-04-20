# 使用requirejs开发多项目gulp打包的demo

### 项目结构
```
├─gulpfile.js  // gulp配置文件
├─package.json
├─README.md
├─src   // 开发目录
|  ├─public    // 公用文件夹
|  ├─project_01  // 项目
|  ├─project_02  // 项目
|  ├─project_03  // 项目
|  |
├─dist  //  生产目录
|  ├─project_01
|  ├─project_02
|  ├─project_03

```

### 实现功能
- [x] 雪碧图合成
- [x] 兼容ie8+
- [x] 修改版本号?v=
- [x] 分项目打包

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


