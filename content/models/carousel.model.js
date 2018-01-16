var keystone = require('keystone'),
    _ = require('lodash'),
    post = require('./post.schema'),
    Types = keystone.Field.Types;

var Carousel = new keystone.List('Carousel', {
        sortable: true,
        label: '輪播項目'
    });

Carousel.add('圖片資訊', {
    display: {
        type: Types.Boolean,
        default: false,
        label: '發佈'
    },
    place: {
        initial: true,
        type: Types.Select,
        options: [
            {value: 'home', label: '首頁輪播'},
            {value: 'news', label: '最新消息頁面輪播'},
            {value: 'banner', label: '首頁 Banner'}
        ],
        label: '使用位置'
    },
}, '輪播資訊', {
    title: {
        type: Types.Text,
        label: '標題（選擇性）'
    },
    subTitle: {
        type: Types.Text,
        label: 'Banner 子標題',
        default: '',
        dependsOn: {
            place: 'banner'
        }
    },
    description: {
        type: Types.Html,
         wysiwyg: true,
        height: 300,
        label: 'Banner 描述',
        default: '',
        dependsOn: {
            place: 'banner'
        }
    },
    link: {
        type: Types.Url,
        label: '連結（選擇性）',
        note: '站內連結請以「/」開頭'
    },
}, '圖片上傳', {
    image: {
        type: Types.CloudinaryImage,
        autoCleanup: true
    },
    style: {
        type: Types.Text,
        label: '圖片位置樣式',
        default: '50% 50%',
        note: '更改兩個數字（0 到 100% 之間）來調整圖片在輪播項目裡面的顯示位置（例如「50% 50%」是水平、垂直置中，「50% 0」是水平置中、垂直置頂）'
    }
});

_.each(post.methods, function (method, name) {
    Carousel.schema.methods[name] = method;
});

_.each(post.validate, function (validator, path) {
    Carousel.schema.path(path).validate(validator);
});

Carousel.defaultColumns = 'image, place, display, title, link';
Carousel.register();
