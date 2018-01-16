var keystone = require('keystone'),
    async = require('async'),
    _ = require('lodash'),
    utils = require('./utils');

module.exports = function (router) {
    router.get('/news', function (req, res, next) {

        var page = parseInt(req.query.page, 10) || 1;

        async.parallel({
            carousel: utils.carousel(keystone.list('Carousel'), 'news'),
            news: utils.paginatedPosts(keystone.list('News'), page, 5)
        }, function (err, results) {
            if (err) return next(err);
            res.render('news', {
                title: '最新消息 - 臺大創意創業中心',
                carousel: results.carousel,
                pagination: results.news
            });
        });
    });

    router.get('/news/:slug', function (req, res, next) {
        var slug = req.params.slug;
        utils.findByIdOrSlug(keystone.list('News'), slug)(function (err, news) {
            if (err || !news) return next(err);
            res.render('post', {
                title: news.title,
                post: news
            });
        });
    });
};
