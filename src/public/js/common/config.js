var require = {
    // baseUrl: 'js',
    paths: {
        'jquery': '../../../public/js/lib/jquery.min',
        'global': '../../../public/js/utils/global',
        'extend': '../../../public/js/utils/extend',
        'login': '../../../public/js/common/login',
        'popup': '../../../public/js/common/popup',
        'common_01': '../../../public/js/common/common_01',
        'common_02': '../../../public/js/common/common_02',
        'a': '../../../public/js/common/a',
        'b': '../../../public/js/common/b',
        'c': '../../../public/js/common/c',
    }
};

if(typeof module === "object" && typeof module.exports === 'object'){
    module.exports = require;
}