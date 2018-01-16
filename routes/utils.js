var validator = require('validator');

exports.featuredPosts = function (keystoneList, limit, select, featuredKey) {
    var query = keystoneList.model.find()
            .where('status', 'published')
            .where(featuredKey || 'featured').gt(0);

    if (limit > 0) query = query.limit(limit);
    if (limit > 1) query = query.sort('featured');
    query = query.select(select || 'slug title image imageUrl style');
    return bindExec(query);
};

exports.paginatedPosts = function (keystoneList, page, limit, select) {
    return bindExec(keystoneList.paginate({
                page: page,
                perPage: limit
            })
            .where('status', 'published')
            .sort('-date')
            .select(select || 'slug title image imageUrl style brief date'));
};

exports.findBySlug = function (keystoneList, slug) {
    return bindExec(keystoneList.model.findOne({slug: slug}));
};

exports.findById = function (keystoneList, _id) {
    return bindExec(keystoneList.model.findOne({_id: _id}));
};

exports.findByIdOrSlug = function (keystoneList, idOrSlug) {
    if (validator.isMongoId(idOrSlug)) {
        return exports.findById(keystoneList, idOrSlug);
    } else {
        return exports.findBySlug(keystoneList, idOrSlug);
    }
};

exports.carousel = function (keystoneList, place, limit) {
    var query = keystoneList.model.find()
            .where('display', true)
            .where('place', place);
    if (limit > 0) query = query.limit(limit);
    return bindExec(query);
};

function bindExec (query) {
    return query.exec.bind(query);
}
