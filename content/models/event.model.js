var keystone = require('keystone'),
    _ = require('lodash'),
    Types = keystone.Field.Types,
    post = require('./post.schema'),
    schema = post();

schema.options.label = '活動';

var Event = new keystone.List('Event', schema.options);

schema.schema.featured_page = {
    type: Types.Number,
    default: 0,
    label: '主打',
    note: '大於 0 的項目將顯示於活動頁面，依數字排序'
};

schema.schema.external = {
    type: Types.Url,
    label: '外連網址（選擇性）'
};

Event.add(schema.schema);

_.each(post.methods, function (method, name) {
    Event.schema.methods[name] = method;
});

_.each(post.validate, function (validator, path) {
    Event.schema.path(path).validate(validator);
});

Event.defaultColumns = 'title, status|10%, date|10%, featured|10%, featured_page|10%';
Event.register();
