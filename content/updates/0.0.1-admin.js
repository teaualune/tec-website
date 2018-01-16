var keystone = require('keystone'),
    User = keystone.list('User');

module.exports = function (done) {
    new User.model({
        name: {
            first: 'Admin',
            last: 'User'
        },
        email: 'email',
        password: 'password',
        isAdmin: true
    }).save(done);
};
