var require = {
    // baseUrl: 'js',
    paths: {
        'jquery': '../lib/jquery.min.js',
        'global': '../utils/global.js',
        'extend': '../utils/extend.js',
        'login': '../common/login.js',
        'popup': '../common/popup.js',
        'common_01': '../common/common_01.js',
        'common_02': '../common/common_02.js',
        'a': '../common/a.js',
        'b': '../common/b.js',
        'c': '../common/c.js',
    }
};

if(typeof module === "object" && typeof module.exports === 'object'){
    module.exports = require;
}