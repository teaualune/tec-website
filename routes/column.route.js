var keystone = require('keystone'),
    async = require('async'),
    _ = require('lodash'),
    utils = require('./utils');

module.exports = function (router) {
    router.get('/columns', function (req, res, next) {

        var page = parseInt(req.query.page, 10) || 1;

        utils.paginatedPosts(
            keystone.list('Column'),
            page,
            10,
            'slug title author image imageUrl style brief date'
        )(function (err, results) {
        // async.parallel({
        //     columns: utils.paginatedPosts(keystone.list('Column'), page, 10)
        // }, function (err, results) {
            if (err) return next(err);
            res.render('columns', {
                title: '專欄 - 臺大創意創業中心',
                pagination: results
            });
        });
    });

    router.get('/columns/:slug', function (req, res, next) {
        var slug = req.params.slug;
        utils.findByIdOrSlug(keystone.list('Column'), slug)(function (err, column) {
            if (err || !column) return next(err);
            res.render('post', {
                title: column.title,
                post: column
            });
        });
    });
};
