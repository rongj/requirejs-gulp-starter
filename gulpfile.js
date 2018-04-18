var gulp = require('gulp'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	replace = require('gulp-replace'),
	rev = require('gulp-rev'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
	through = require('through2'),
	fs = require('fs'),
	browserSync = require("browser-sync").create(),
	gulpsync = require('gulp-sync')(gulp);

var __path = '/';

 //将类style-b47bb72002.css修改为style.css?v=b47bb72002
function fixHash() {
    return through.obj(function (file, enc, cb) {
        let reg = new RegExp('(.*)-([0-9a-z]+).(.*)');
        let settings = JSON.parse(file.contents.toString());
        Object.keys(settings).forEach((key) => {
            settings[key] = settings[key].replace(reg, '$1.$3?v=$2');  // 自定义版本号
        });
        file.contents = new Buffer(JSON.stringify(settings).toString());
        return cb(null, file);
    });
}

// html
gulp.task('html', function () {
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
	return gulp.src('src/'+__path+'*.html')
		.pipe(htmlmin(options))
		.pipe(gulp.dest('dist/'+__path))
})

// 样式
gulp.task('scss', function () {
	gulp.src(['src/'+__path+'scss/page/*.scss', 'src/'+__path+'scss/common/*.scss'])
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 10 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('src/'+__path+'css'))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/'+__path+'css'))
		.pipe(rev())
		.pipe(rev.manifest())
		.pipe(fixHash())
		.pipe(gulp.dest('src/'+__path+'rev/css'))
});

gulp.task('css', ['scss'], function () {
	return gulp.src(['src/'+__path+'scss/page/*.css'])
		.pipe(autoprefixer('last 10 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/'+__path+'css'))
});

// 开发环境
gulp.task('devscss', function () {
	return new Promise(function (resolve, reject) {
		return setTimeout(function () {
			return gulp.src(['src/'+__path+'/scss/page/*.scss', 'src/'+__path+'scss/common/*.scss'])
				.pipe(sass({ style: 'expanded' }))
				.pipe(autoprefixer('last 10 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
				.on('error', function(e) {
				    return reject(e) && this.end();
				})
				.pipe(minifycss())
				.pipe(gulp.dest('src/'+__path+'css'))
				.on('end', resolve)
		}, 500)
	}).catch(function (e) {
		notify({ message: e.messageFormatte });
	})
});

gulp.task('devcss', ['devscss'], function () {
	return gulp.src(['src/'+__path+'/scss/page/*.css'])
		.pipe(autoprefixer('last 10 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('src/'+__path+'css'))
});


// 脚本
gulp.task('js', function () {
	// js复制
	gulp.src(['src/'+__path+'js/lib/require.js'])
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest('dist/'+__path+'js'))

	// js合并压缩
	gulp.src(['src/'+__path+'js/page/*.js'])
		.pipe(requirejsOptimize({
	        optimize: 'none',
	        mainConfigFile: 'src/js/common/config.js',
	    }))
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest('dist/'+__path+'js'))
		.pipe(rev())
		.pipe(rev.manifest())
		.pipe(fixHash())
		.pipe(gulp.dest('src/'+__path+'rev/js'))
})


// 图片
gulp.task('img', function() { 
	return gulp.src('src/'+__path+'images/**')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('dist/'+__path+'images'))
});


// 清理
gulp.task('clean', function () {
	return gulp.src('dist/'+__path, {read: false})
		.pipe(clean())
})


// 版本
gulp.task('rev', function () {
	gulp.src(['dist/'+__path+'*.html'])
		.pipe(replaceHash('src/'+__path+'rev/css/rev-manifest.json'))
		.pipe(replaceHash('src/'+__path+'rev/js/rev-manifest.json'))
        .pipe(gulp.dest('dist/'+__path))
})


//将html中的js/css的引用添加hash值
function replaceHash(filename) {
    let settings = JSON.parse(fs.readFileSync(filename));
    // fs.unlink(filename);
    return through.obj(function (file, enc, cb) {
        let str = file.contents.toString();
        Object.keys(settings).forEach(function (key) {
            str = str.replace(key, settings[key]);
        });
        file.contents = new Buffer(str);
        return cb(null, file);
    });
}

// 监视
gulp.task('watch', function () {

	// 监视所有.scss文件改动
	gulp.watch('src/'+__path+'/scss/*/*.scss', ['devscss']);

	// 监视所有.css文件改动
	gulp.watch('src/'+__path+'/scss/*/*.css', ['devcss']);
	
	// 监视所有位在src目录下的文件，一旦有更动，便进行重整
	gulp.watch(['src/'+__path+'*']).on('change', browserSync.reload);
})


// 开发环境
gulp.task('dev', gulpsync.sync([['devscss', 'devcss'], 'watch']), function(){
	// 开启热更新服务
	// browserSync.init({
	// 	server: "./src"
	// });
})

// 生产环境
gulp.task('build', gulpsync.sync(['clean', ['html', 'scss', 'css', 'js', 'img'], 'rev']))