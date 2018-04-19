var require = {
    // baseUrl: 'js',
    paths: {
        'jquery': '../lib/jquery.min',
        'global': '../utils/global',
        'extend': '../utils/extend',
        'login': '../common/login',
        'popup': '../common/popup',
        'common_01': '../common/common_01',
        'common_02': '../common/common_02',
        'a': '../common/a',
        'b': '../common/b',
        'c': '../common/c',
    }
};

if(typeof module === "object" && typeof module.exports === 'object'){
    module.exports = require;
}