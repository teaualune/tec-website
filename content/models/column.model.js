var keystone = require('keystone'),
    _ = require('lodash'),
    post = require('./post.schema'),
    schema = post();

schema.options.label = '專欄文章';

var Column = new keystone.List('Column', schema.options);

Column.add(schema.schema);

_.each(post.methods, function (method, name) {
    Column.schema.methods[name] = method;
});

_.each(post.validate, function (validator, path) {
    Column.schema.path(path).validate(validator);
});

Column.defaultColumns = 'title, status|10%, date|10%, featured|10%';
Column.register();
