var keystone = require('keystone'),
    Types = keystone.Field.Types;

var schema = function () {
    return {
        options: {
            map: {
                name: 'title'
            },
            autokey: {
                path: 'slug',
                from: 'title',
                unique: true
            },
            track: true,
            defaultSort: '-date'
        },
        schema: {
            title: {
                type: Types.Text,
                required: true,
                initial: true,
                label: '標題'
            },
            author: {
                type: Types.Text,
                label: '作者'
            },
            status: {
                type: Types.Select,
                options: [
                    {value: 'draft', label: '草稿'},
                    {value: 'published', label: '發佈'},
                    {value: 'archived', label: '封存'}
                ],
                default: 'draft',
                label: '發佈狀態'
            },
            content: {
                type: Types.Html,
                wysiwyg: true,
                height: 600,
                label: '內文'
            },
            brief: {
                type: Types.Textarea,
                // type: Types.Text,
                height: 300,
                label: '內文節錄'
            },
            date: {
                type: Types.Datetime,
                required: true,
                default: Date.now,
                label: '日期'
            },
            featured: {
                type: Types.Number,
                default: 0,
                label: '首頁標記',
                note: '大於 0 的項目將顯示於首頁，依數字排序'
            },
            image: {
                type: Types.CloudinaryImage,
                autoCleanup: true,
                label: 'Cloudinary 圖片',
                note: '上傳至 Cloudinary'
            },
            imageUrl: {
                type: Types.Url,
                label: '圖片網址',
                note: '有 Cloudinary 圖片的話會優先顯示 Cloudinary 圖片'
            },
            style: {
                type: Types.Text,
                label: '首頁標記圖片位置樣式',
                default: '50% 50%',
                note: '更改兩個數字（0 到 100% 之間）來調整圖片在首頁標記的顯示位置（例如「50% 50%」是水平、垂直置中，「50% 0」是水平置中、垂直置頂）'
            }
        }
    };
};

schema.validate = {
    style: function (value) {
        var ripped = value.split(' ').filter(function (v) {
                return v.length;
            });
        if (ripped.length < 1 || ripped.length > 2) return false;
        return ripped.reduce(function (retval, v) {
            var check = false;
            if (v === '0') check = true;
            else if (v.slice(-1) === '%' && !isNaN(parseFloat(v.slice(0, -1)))) check = true;
            return retval && check;
        });
    }
};

function getImageUrlByWidthRatio(entity, widthRatio) {
    var image = entity.image;
    if (entity._ && entity._.image && image && image.url && image.url.length) {
        return widthRatio ? entity._.image.scale(widthRatio) : image.url;
    } else if (entity.imageUrl) {
        return entity.imageUrl;
    } else {
        return null;
    }
}

schema.methods = {
    background: function (widthRatio) {
        var url = getImageUrlByWidthRatio(this, widthRatio);
        if (url)
            return 'background-size:cover;background-image:url(\"' + url + '\");' +
                'background-position:' + this.style + ';';
        else
            return '';
    },
    imgSrc: function(widthRatio) {
        return getImageUrlByWidthRatio(this, widthRatio);
    },
    objectPosition: function () {
        return 'object-position:' + this.style + ';';
    }
};

module.exports = schema;
