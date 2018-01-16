var keystone = require('keystone'),
    _ = require('lodash'),
    post = require('./post.schema'),
    schema = post();

schema.options.label = '最新消息';

var News = new keystone.List('News', schema.options);

News.add(schema.schema);

_.each(post.methods, function (method, name) {
    News.schema.methods[name] = method;
});

_.each(post.validate, function (validator, path) {
    News.schema.path(path).validate(validator);
});

News.defaultColumns = 'title, status|10%, date|10%, featured|10%';
News.register();
