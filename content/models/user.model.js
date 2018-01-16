var keystone = require('keystone'),
    Types = keystone.Field.Types;

var User = new keystone.List('User', {
        label: '使用者'
    });

User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    password: { type: Types.Password, initial: true, required: true },
    isAdmin: { type: Boolean, label: '管理員', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
    return this.isAdmin;
});

User.defaultColumns = 'name, email, isAdmin';
User.register();
