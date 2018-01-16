var keystone = require('keystone');
var config = require('../config');

module.exports = function (app, onMount) {
    keystone.init({
        name: 'tec-website',
        brand: 'tec-website',
        'module root': __dirname,
        app: app,
        mongo: config.mongo,
        'user model': 'User',
        'cookie secret': config.cookieSecret,
        updates: 'updates',
        'auto update': true,
        auth: true,

        'wysiwyg menubar': true,
        'wysiwyg font_size_style_values': ['12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,36px'],
        'wysiwyg additional buttons': 'fontsizeselect, inserttable',
        'wysiwyg additional plugins': 'textcolor, media, table, paste',
        'wysiwyg cloudinary images': true,
        'wysiwyg additional options': {
            paste_remove_styles: true,
            paste_remove_spans: true,
            paste_remove_styles_if_webkit: true
        }
    });

    keystone.set('cloudinary config', config.cloudinary);

    keystone.import('models');

    keystone.set('nav', config.adminMenu);

    keystone.mount({
        onMount: function () {
            console.log('Keystone admin is available at %s', '/keystone');
            onMount();
        }
    });
};
