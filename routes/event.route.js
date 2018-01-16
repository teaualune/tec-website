var keystone = require('keystone'),
    async = require('async'),
    _ = require('lodash'),
    Event = keystone.list('Event'),
    utils = require('./utils');

module.exports = function (router) {
    router.get('/events', function (req, res, next) {
        var page = parseInt(req.query.page, 10) || 1;
        async.parallel({
            featured: utils.featuredPosts(Event, 3, 'slug title image imageUrl style external', 'featured_page'),
            upcomingEvents: function (callback) {
                Event.model.find()
                .where('status', 'published')
                .where('date').gte(new Date())
                .sort('date')
                .limit(2)
                .select('slug title image imageUrl style date external')
                .exec(callback);
            },
            pastEvents: function (callback) {
                Event.paginate({
                    page: page,
                    perPage: 4
                })
                .where('status', 'published')
                .where('date').lt(new Date())
                .sort('-date')
                .select('slug title image imageUrl style brief date external')
                .exec(callback);
            }
        }, function (err, results) {
            if (err) return next(err);
            res.render('events', {
                title: '創創中心活動',
                featured: results.featured,
                upcomingEvents: results.upcomingEvents,
                pastEvents: results.pastEvents
            });
        });
    });

    router.get('/events/:slug', function (req, res, next) {
        var slug = req.params.slug;
        utils.findByIdOrSlug(keystone.list('Event'), slug)(function (err, event) {
            if (err || !event) return next(err);
            res.render('event', {
                title: event.title,
                event: event
            });
        });
    });
};
