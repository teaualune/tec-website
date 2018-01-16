var keystone = require('keystone'),
    async = require('async'),
    _ = require('lodash'),
    utils = require('./utils');

module.exports = function (router) {
    router.get('/', function (req, res, next) {
        async.parallel({
            carousel: utils.carousel(keystone.list('Carousel'), 'home'),
            banner: utils.carousel(keystone.list('Carousel'), 'banner', 1),
            news: utils.featuredPosts(keystone.list('News'), 3, 'slug title image imageUrl style brief'),
            events: utils.featuredPosts(keystone.list('Event'), 5),
            columns: utils.featuredPosts(keystone.list('Column'), 1, 'slug title image imageUrl style brief author')
        }, function (err, results) {
            if (err) return next(err);
            var banner = null, hasBannerContent = false;
            if (results.banner && results.banner.length) {
                banner = results.banner[0];
                if ((banner.title && banner.title.length) || banner.subTitle.length || banner.description.length) {
                    hasBannerContent = true;
                }
            }
            res.render('index', {
                title: '臺大創意創業中心',
                carousel: results.carousel,
                banner: banner,
                hasBannerContent: hasBannerContent,
                news: results.news,
                events: results.events,
                columns: results.columns
            });
        });
    });
};
